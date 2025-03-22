import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";


type BureauType = 'Normalized Evaluation' | 'CIBIL' | 'Experian' | 'Equifax' | 'CRIF Highmark';


interface ApiLoan {
  AMOUNT: number;
  BANK: string;
  TIME_PERIOD: string;
}

interface ApiDefaults {
  [bank: string]: number;
}

interface ApiMissedPayments {
  [bank: string]: number;
}

interface ApiCreditData {
  USERNAME: string;
  CREDIT_SCORE: number;
  CURRENT_LOANS: ApiLoan[];
  NO_OF_TIMES_DEFAULTED: ApiDefaults;
  SETTLED_LOANS: ApiLoan[];
  MISSED_PAYMENTS: ApiMissedPayments;
}

interface ApiResponse {
  status: string;
  message: ApiCreditData;
}

// Define the transformed credit report structure
interface CreditReport {
  bureau: BureauType;
  username: string;
  creditScore: number;
  scoreRange: { min: number; max: number };
  lastUpdated: string;
  currentLoans: Array<{ amount: number; bank: string; timePeriod: string }>;
  defaults: Array<{ bank: string; count: number }>;
  settledLoans: Array<{ amount: number; bank: string; timePeriod: string }>;
  missedPayments: Array<{ bank: string; count: number }>;
}

const Index = () => {
  const location = useLocation();
  const state = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize creditReports with empty default values for each bureau
  const [creditReports, setCreditReports] = useState<Record<BureauType, CreditReport>>({
    'Normalized Evaluation': createEmptyReport('Normalized Evaluation'),
    'CIBIL': createEmptyReport('CIBIL'),
    'Experian': createEmptyReport('Experian'),
    'Equifax': createEmptyReport('Equifax'),
    'CRIF Highmark': createEmptyReport('CRIF Highmark')
  });
  
  const [selectedBureau, setSelectedBureau] = useState<BureauType>("Normalized Evaluation");
  const [normalizedScore, setNormalizedScore] = useState<number>(650);

  // Function to create an empty credit report
  function createEmptyReport(bureau: BureauType): CreditReport {
    return {
      bureau,
      username: '',
      creditScore: 0,
      scoreRange: { min: 300, max: 900 },
      lastUpdated: new Date().toISOString().split('T')[0],
      currentLoans: [],
      defaults: [],
      settledLoans: [],
      missedPayments: []
    };
  }

  // Function to transform API response to CreditReport format
  function transformApiResponse(bureau: BureauType, apiData: ApiCreditData): CreditReport {
    // Transform defaults object to array
    const defaultsArray = Object.entries(apiData.NO_OF_TIMES_DEFAULTED || {}).map(([bank, count]) => ({
      bank,
      count
    }));

    // Transform missed payments object to array
    const missedPaymentsArray = Object.entries(apiData.MISSED_PAYMENTS || {}).map(([bank, count]) => ({
      bank,
      count
    }));

    return {
      bureau,
      username: apiData.USERNAME,
      creditScore: apiData.CREDIT_SCORE,
      scoreRange: { min: 300, max: 900 },
      lastUpdated: new Date().toISOString().split('T')[0],
      currentLoans: (apiData.CURRENT_LOANS || []).map(loan => ({
        amount: loan.AMOUNT,
        bank: loan.BANK,
        timePeriod: loan.TIME_PERIOD
      })),
      defaults: defaultsArray,
      settledLoans: (apiData.SETTLED_LOANS || []).map(loan => ({
        amount: loan.AMOUNT,
        bank: loan.BANK,
        timePeriod: loan.TIME_PERIOD
      })),
      missedPayments: missedPaymentsArray
    };
  }

  // Function to calculate normalized score
  function getNormalizedScore(
    cibil: number, 
    crif: number, 
    equifax: number, 
    experian: number, 
    loanType: string
  ): number {
    const weightConfig: Record<string, Record<string, number>> = {
      "personal": { cibil: 0.5, crif: 0.2, equifax: 0.2, experian: 0.1 },
      "business": { cibil: 0.3, crif: 0.4, equifax: 0.2, experian: 0.1 },
      "home": { cibil: 0.4, crif: 0.3, equifax: 0.2, experian: 0.1 },
      "car": { cibil: 0.35, crif: 0.25, equifax: 0.3, experian: 0.1 },
      "education": { cibil: 0.3, crif: 0.3, equifax: 0.25, experian: 0.15 }
    };

    if (!weightConfig[loanType]) {
      throw new Error("Invalid loan type provided.");
    }

    const weights = weightConfig[loanType];

    const normalizedScore = Math.round(
      (cibil * weights.cibil) +
      (crif * weights.crif) +
      (equifax * weights.equifax) +
      (experian * weights.experian)
    );

    return normalizedScore;
  }

  // Create a normalized report by combining data from all bureaus
  function createNormalizedReport(reports: Record<BureauType, CreditReport>, score: number): CreditReport {
    const allCurrentLoans: any[] = [];
    const allDefaults: any[] = [];
    const allSettledLoans: any[] = [];
    const allMissedPayments: any[] = [];
    
    // Use the first available username
    let username = '';
    
    // Collect data from all reports
    Object.values(reports).forEach(report => {
      if (report.bureau !== 'Normalized Evaluation') {
        if (!username && report.username) {
          username = report.username;
        }
        
        report.currentLoans.forEach(loan => {
          if (!allCurrentLoans.some(l => l.bank === loan.bank && l.amount === loan.amount)) {
            allCurrentLoans.push(loan);
          }
        });
        
        report.defaults.forEach(def => {
          if (!allDefaults.some(d => d.bank === def.bank)) {
            allDefaults.push(def);
          }
        });
        
        report.settledLoans.forEach(loan => {
          if (!allSettledLoans.some(l => l.bank === loan.bank && l.amount === loan.amount)) {
            allSettledLoans.push(loan);
          }
        });
        
        report.missedPayments.forEach(payment => {
          if (!allMissedPayments.some(p => p.bank === payment.bank)) {
            allMissedPayments.push(payment);
          }
        });
      }
    });
    
    return {
      bureau: 'Normalized Evaluation',
      username,
      creditScore: score,
      scoreRange: { min: 300, max: 900 },
      lastUpdated: new Date().toISOString().split('T')[0],
      currentLoans: allCurrentLoans,
      defaults: allDefaults,
      settledLoans: allSettledLoans,
      missedPayments: allMissedPayments
    };
  }

  useEffect(() => {
    if (state.pan_id) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const pan = state.pan_id;
          const loanType = state.loan_type || "personal"; // Default to personal if not specified
          
          // Fetch data from all 4 APIs
          const [cibilResponse, equifaxResponse, experianResponse, crifResponse] = await Promise.all([
            axios.get<ApiResponse>(`https://elk-one-mosquito.ngrok-free.app/cibil/?pan_id=${pan}`),
            axios.get<ApiResponse>(`https://elk-one-mosquito.ngrok-free.app/equifax/?pan_id=${pan}`),
            axios.get<ApiResponse>(`https://elk-one-mosquito.ngrok-free.app/experian/?pan_id=${pan}`),
            axios.get<ApiResponse>(`https://elk-one-mosquito.ngrok-free.app/crif_highmark/?pan_id=${pan}`)
          ]);

          // Extract the credit scores
          const cibilScore = cibilResponse.data.message.CREDIT_SCORE;
          const equifaxScore = equifaxResponse.data.message.CREDIT_SCORE;
          const experianScore = experianResponse.data.message.CREDIT_SCORE;
          const crifScore = crifResponse.data.message.CREDIT_SCORE;
          
          // Calculate the normalized score
          const normalScore = getNormalizedScore(cibilScore, crifScore, equifaxScore, experianScore, loanType);
          setNormalizedScore(normalScore);
          

          const newReports: Record<BureauType, CreditReport> = {
            'CIBIL': transformApiResponse('CIBIL', cibilResponse.data.message),
            'Equifax': transformApiResponse('Equifax', equifaxResponse.data.message),
            'Experian': transformApiResponse('Experian', experianResponse.data.message),
            'CRIF Highmark': transformApiResponse('CRIF Highmark', crifResponse.data.message),
            'Normalized Evaluation': createEmptyReport('Normalized Evaluation') // Will update this next
          };
          
          // Create the normalized report
          newReports['Normalized Evaluation'] = createNormalizedReport(newReports, normalScore);
          
          setCreditReports(newReports);
          toast({
            title: "Credit data loaded",
            description: "Your credit information has been fetched successfully."
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          toast({
            title: "Failed to load credit data",
            description: "There was an error fetching your credit information.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      // If no PAN ID in state, load with dummy data to demonstrate UI
      setIsLoading(false);
    }
  }, [state.pan_id]);

  const handleSelectBureau = (bureau: BureauType) => {
    setSelectedBureau(bureau);
  };

  const currentReport = creditReports[selectedBureau];

  // Define animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeIn = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // For background animations
  const backgroundAnimations = {
    gradient1: {
      x: [0, 10, 0],
      y: [0, 15, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    gradient2: {
      x: [0, -15, 0],
      y: [0, -10, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }
    },
    gradient3: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.7, 0.5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <motion.div 
            className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg font-medium text-muted-foreground">Loading your credit information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={backgroundAnimations.gradient1}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={backgroundAnimations.gradient2}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] w-64 h-64 bg-bureau-cibil/5 rounded-full blur-3xl"
          animate={backgroundAnimations.gradient3}
        />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <motion.main
          className="px-8 py-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible">
          <div className="grid grid-cols-12 gap-6">
            {/* Header/Title */}
            <motion.div
              className="col-span-12"
              variants={fadeIn}>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Credit Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Welcome, {currentReport.username || 'User'}</span>
                </div>
              </div>
            </motion.div>

            {/* Credit Score Summary */}
            <motion.div
              className="col-span-12 lg:col-span-8"
              variants={fadeIn}>
              <div className="bg-card rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Credit Score: {currentReport.bureau}</h2>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-5xl font-bold mb-2">{currentReport.creditScore}</div>
                    <div className="text-sm text-muted-foreground">
                      Range: {currentReport.scoreRange.min} - {currentReport.scoreRange.max}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Last Updated: {currentReport.lastUpdated}
                    </div>
                  </div>
                  <div className="w-32 h-32 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-lg font-medium">
                        {currentReport.creditScore >= 750 ? 'Excellent' : 
                         currentReport.creditScore >= 700 ? 'Good' : 
                         currentReport.creditScore >= 650 ? 'Fair' : 'Poor'}
                      </div>
                    </div>
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#ddd"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={
                          currentReport.creditScore >= 750 ? '#10b981' : 
                          currentReport.creditScore >= 700 ? '#3b82f6' : 
                          currentReport.creditScore >= 650 ? '#f59e0b' : '#ef4444'
                        }
                        strokeWidth="2"
                        strokeDasharray={`${(currentReport.creditScore - 300) / 6}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bureau Selector */}
            <motion.div
              className="col-span-12 lg:col-span-4"
              variants={fadeIn}>
              <div className="bg-card rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Credit Bureaus</h2>
                <div className="space-y-2">
                  {['Normalized Evaluation', 'CIBIL', 'Experian', 'Equifax', 'CRIF Highmark'].map((bureau) => (
                    <button
                      key={bureau}
                      onClick={() => handleSelectBureau(bureau as BureauType)}
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                        selectedBureau === bureau 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="font-medium">{bureau}</div>
                      <div className="text-sm opacity-90">
                        Score: {creditReports[bureau as BureauType].creditScore}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Current Loans */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              variants={fadeIn}>
              <div className="bg-card rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Current Loans</h2>
                {currentReport.currentLoans.length > 0 ? (
                  <div className="space-y-4">
                    {currentReport.currentLoans.map((loan, index) => (
                      <div key={index} className="bg-muted p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{loan.bank}</div>
                            <div className="text-sm text-muted-foreground">
                              Period: {loan.timePeriod}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{loan.amount.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No active loans found
                  </div>
                )}
              </div>
            </motion.div>

            {/* Settled Loans */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              variants={fadeIn}>
              <div className="bg-card rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Settled Loans</h2>
                {currentReport.settledLoans.length > 0 ? (
                  <div className="space-y-4">
                    {currentReport.settledLoans.map((loan, index) => (
                      <div key={index} className="bg-muted p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{loan.bank}</div>
                            <div className="text-sm text-muted-foreground">
                              Period: {loan.timePeriod}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{loan.amount.toLocaleString()}</div>
                            <div className="text-sm text-green-500">Settled</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No settled loans found
                  </div>
                )}
              </div>
            </motion.div>

            {/* Defaults */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              variants={fadeIn}>
              <div className="bg-card rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Payment Defaults</h2>
                {currentReport.defaults.length > 0 && currentReport.defaults.some(d => d.count > 0) ? (
                  <div className="space-y-4">
                    {currentReport.defaults
                      .filter(def => def.count > 0)
                      .map((def, index) => (
                        <div key={index} className="bg-muted p-4 rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{def.bank}</div>
                            <div className="text-right">
                              <div className="font-bold text-red-500">
                                {def.count} {def.count === 1 ? 'Default' : 'Defaults'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No defaults found
                  </div>
                )}
              </div>
            </motion.div>

            {/* Missed Payments */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              variants={fadeIn}>
              <div className="bg-card rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Missed Payments</h2>
                {currentReport.missedPayments.length > 0 && currentReport.missedPayments.some(m => m.count > 0) ? (
                  <div className="space-y-4">
                    {currentReport.missedPayments
                      .filter(payment => payment.count > 0)
                      .map((payment, index) => (
                        <div key={index} className="bg-muted p-4 rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{payment.bank}</div>
                            <div className="text-right">
                              <div className="font-bold text-amber-500">
                                {payment.count} {payment.count === 1 ? 'Missed Payment' : 'Missed Payments'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No missed payments found
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Index;
