
import { BureauType, CreditReport } from "../types/credit";

// Helper function to get score rating
export const getScoreRating = (score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
  if (score >= 750) return 'Excellent';
  if (score >= 700) return 'Good';
  if (score >= 650) return 'Fair';
  return 'Poor';
};

// Helper function to get color based on score
export const getScoreColor = (score: number): string => {
  if (score >= 750) return 'credit-excellent';
  if (score >= 700) return 'credit-good';
  if (score >= 650) return 'credit-fair';
  return 'credit-poor';
};

// Helper function to get bureau color
export const getBureauColor = (bureau: BureauType): string => {
  switch(bureau) {
    case 'CIBIL': return 'bureau-cibil';
    case 'Experian': return 'bureau-experian';
    case 'Equifax': return 'bureau-equifax';
    case 'CRIF': return 'bureau-crif';
  }
};

// Mock data for credit reports from different bureaus
export const mockCreditReports: Record<BureauType, CreditReport> = {
  'CIBIL': {
    bureau: 'CIBIL',
    panNumber: 'ABCDE1234F',
    username: 'Rahul Sharma',
    creditScore: 765,
    scoreRange: { min: 300, max: 900 },
    lastUpdated: '2023-05-15',
    currentLoans: [
      { amount: 1500000, bank: 'HDFC Bank', timePeriod: 60 },
      { amount: 200000, bank: 'ICICI Bank', timePeriod: 12 }
    ],
    defaults: [
      { bank: 'Axis Bank', count: 1 }
    ],
    settledLoans: [
      { amount: 500000, bank: 'SBI Bank', timePeriod: 36 }
    ],
    missedPayments: [
      { bank: 'HDFC Bank', count: 2 },
      { bank: 'ICICI Bank', count: 1 }
    ]
  },
  'Experian': {
    bureau: 'Experian',
    panNumber: 'ABCDE1234F',
    username: 'Rahul Sharma',
    creditScore: 742,
    scoreRange: { min: 300, max: 900 },
    lastUpdated: '2023-04-28',
    currentLoans: [
      { amount: 1500000, bank: 'HDFC Bank', timePeriod: 60 },
      { amount: 200000, bank: 'ICICI Bank', timePeriod: 12 },
      { amount: 50000, bank: 'Standard Chartered', timePeriod: 6 }
    ],
    defaults: [
      { bank: 'Axis Bank', count: 1 }
    ],
    settledLoans: [
      { amount: 500000, bank: 'SBI Bank', timePeriod: 36 },
      { amount: 100000, bank: 'Kotak Bank', timePeriod: 12 }
    ],
    missedPayments: [
      { bank: 'HDFC Bank', count: 1 },
      { bank: 'ICICI Bank', count: 1 }
    ]
  },
  'Equifax': {
    bureau: 'Equifax',
    panNumber: 'ABCDE1234F',
    username: 'Rahul Sharma',
    creditScore: 754,
    scoreRange: { min: 300, max: 900 },
    lastUpdated: '2023-05-10',
    currentLoans: [
      { amount: 1500000, bank: 'HDFC Bank', timePeriod: 60 },
      { amount: 200000, bank: 'ICICI Bank', timePeriod: 12 }
    ],
    defaults: [
      { bank: 'Axis Bank', count: 0 }
    ],
    settledLoans: [
      { amount: 500000, bank: 'SBI Bank', timePeriod: 36 }
    ],
    missedPayments: [
      { bank: 'HDFC Bank', count: 1 }
    ]
  },
  'CRIF': {
    bureau: 'CRIF',
    panNumber: 'ABCDE1234F',
    username: 'Rahul Sharma',
    creditScore: 748,
    scoreRange: { min: 300, max: 900 },
    lastUpdated: '2023-05-22',
    currentLoans: [
      { amount: 1500000, bank: 'HDFC Bank', timePeriod: 60 },
      { amount: 200000, bank: 'ICICI Bank', timePeriod: 12 }
    ],
    defaults: [
      { bank: 'Axis Bank', count: 1 }
    ],
    settledLoans: [
      { amount: 500000, bank: 'SBI Bank', timePeriod: 36 }
    ],
    missedPayments: [
      { bank: 'HDFC Bank', count: 2 },
      { bank: 'ICICI Bank', count: 1 }
    ]
  }
};
