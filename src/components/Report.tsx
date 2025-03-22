import { motion } from "framer-motion";
import {
  FileText,
  ChevronRight,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  Calendar,
  Building,
  Lock,
} from "lucide-react";
import CreditScoreIndicator from "@/components/CreditScoreIndicator";
import ReportSection from "@/components/ReportSection";
import TermItem from "@/components/TermItem";
import DecisionBadge from "@/components/DecisionBadge";

// Credit report data
const reportData = {
  "Applicant Profile Summary":
    "The applicant, Vikas Rambilas Mundada, has a stable income stream with a mix of rent, dividends, and interest income. He has high-value assets, including properties in Pune and equity shares. His bank statement shows a stable cash flow trend with regular high-value credits and debits. He has a high average monthly balance of ₹1,200,000 and no overdraft or negative balances. He has no cheque bounce instances and has paid no loan EMIs explicitly mentioned in the statement.",

  "Creditworthiness Assessment":
    "The applicant's creditworthiness is assessed based on the bureau scores, number of defaults/missed payments, current loan obligations, past settled loans, cash flow analysis, income consistency, and other factors. According to CRIF Highmark, his credit score is 760, with 1 defaulted loan and 2 missed payments. Equifax reports a credit score of 770, with 2 defaulted loans and 3 missed payments. Experian shows a credit score of 780, with 1 defaulted loan and 2 missed payments. The applicant has a mix of current and settled loans, indicating a stable repayment behavior. His cash flow analysis suggests a stable income and ability to repay loans. However, his income consistency is not a major concern as he has a steady income stream.",

  "Identified Risks":
    "The identified risks include high-value defaults, missed payments, and a high debt-to-income ratio. The applicant has defaulted on loans from ICICI Bank and Axis Bank, and has missed payments on loans from HDFC Bank and Axis Bank. His debt-to-income ratio is high, indicating a significant liability burden. Additionally, he has a high-value asset, a property in Pune, which may be a significant liability if not managed properly.",

  "Final Lending Decision": "Approve with Conditions",

  "Justification for the Decision":
    "The decision to approve the loan with conditions is based on the applicant's stable income, existing liabilities, repayment behavior, and cash flow strength. Although the applicant has defaulted on loans and missed payments, he has a stable repayment behavior and a high credit score. His cash flow analysis suggests a stable income and ability to repay loans. However, his high debt-to-income ratio and significant liability burden require careful management. Therefore, the loan will be approved with conditions, including a lower loan amount, a higher interest rate, and a shorter tenure.",

  "Recommended Lending Terms": {
    "Maximum Loan Amount": "₹5,000,000",
    "Interest Rate Range": "12.5% - 15%",
    Tenure: "3-5 years",
    "Collateral Requirement":
      "Yes, a property in Pune with a suggested value of ₹3,000,000",
  },

  "Risk Mitigation Suggestions":
    "To mitigate the identified risks, the following actions can be taken: Mandatory collateral, guarantor requirement, EMI auto-debit mandates, and a shorter tenure. Additionally, the loan amount can be reduced, and the interest rate can be increased to manage the applicant's debt-to-income ratio and liability burden.",
};

// Bureau credit scores
const bureauScores = [
  { bureau: "CRIF Highmark", score: 760 },
  { bureau: "Equifax", score: 770 },
  { bureau: "Experian", score: 780 },
];

const Report = () => {
  return (
    <main className="p-6 h-[calc(100vh-64px)] overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-semibold">Credit Assessment Report</h1>
      </motion.div>

      <motion.div className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <span>Reports</span>
        <ChevronRight className="h-4 w-4" />
        <span>Credit Assessment</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Vikas Rambilas Mundada</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="glass-premium glass-section p-5 lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-lg">
              VM
            </div>
            <div>
              <h2 className="text-xl font-semibold">Vikas Rambilas Mundada</h2>
              <p className="text-foreground/60 text-sm">
                Application ID: LOAN-2023-10-42857
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-foreground/80 space-y-1">
              <p>{reportData["Applicant Profile Summary"]}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-premium relative flex flex-col p-5 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}>
          <div className="flex items-center mb-5">
            <div className="h-5 w-1.5 bg-status-pending rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold">Final Decision</h2>
          </div>

          <div className="flex items-center justify-center py- mb-4">
            <DecisionBadge decision={reportData["Final Lending Decision"]} />
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <p className="text-sm text-white/70 font-medium mb-2">
              Decision Summary:
            </p>
            <p className="text-sm leading-relaxed">
              {reportData["Justification for the Decision"].substring(0, 500)}
              ...
            </p>
          </div>
        </motion.div>
      </div>

      <ReportSection
        title="Credit Bureau Scores"
        delay={0.2}
        className="mb-6 glass-premium">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bureauScores.map((item) => (
            <CreditScoreIndicator
              key={item.bureau}
              bureau={item.bureau}
              score={item.score}
            />
          ))}
        </div>
      </ReportSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ReportSection title="Creditworthiness Assessment" delay={0.3}>
          <p className="text-sm leading-relaxed">
            {reportData["Creditworthiness Assessment"]}
          </p>
        </ReportSection>

        <ReportSection title="Identified Risks" delay={0.4}>
          <p className="text-sm leading-relaxed">
            {reportData["Identified Risks"]}
          </p>
          <div className="mt-4 p-3 bg-status-rejected/10 border border-status-rejected/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-status-rejected shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-status-rejected mb-1">
                  High Risk Factors
                </h4>
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li>High-value defaults on ICICI Bank and Axis Bank loans</li>
                  <li>Missed payments on HDFC Bank and Axis Bank loans</li>
                  <li>High debt-to-income ratio</li>
                </ul>
              </div>
            </div>
          </div>
        </ReportSection>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ReportSection
          title="Recommended Lending Terms"
          delay={0.5}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TermItem
              term="Maximum Loan Amount"
              value={reportData["Recommended Lending Terms"]["Maximum Loan Amount"]}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <TermItem
              term="Interest Rate Range"
              value={reportData["Recommended Lending Terms"]["Interest Rate Range"]}
              icon={<CreditCard className="h-5 w-5" />}
            />
            <TermItem
              term="Tenure"
              value={reportData["Recommended Lending Terms"]["Tenure"]}
              icon={<Calendar className="h-5 w-5" />}
            />
            <TermItem
              term="Collateral Requirement"
              value={reportData["Recommended Lending Terms"]["Collateral Requirement"]}
              icon={<Building className="h-5 w-5" />}
            />
          </div>
        </ReportSection>

        <ReportSection title="Risk Mitigation" delay={0.6}>
          <div className="flex items-start gap-3 mb-4">
            <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">
              {reportData["Risk Mitigation Suggestions"]}
            </p>
          </div>

          <div className="p-3 bg-status-approved/10 border border-status-approved/20 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-status-approved shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-status-approved mb-1">
                  Recommended Actions
                </h4>
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li>Mandatory collateral</li>
                  <li>Guarantor requirement</li>
                  <li>EMI auto-debit mandates</li>
                  <li>Shorter tenure</li>
                </ul>
              </div>
            </div>
          </div>
        </ReportSection>
      </div>

      <ReportSection
        title="Justification for Decision"
        delay={0.7}
        className="mb-6"
        icon={<ClipboardList className="h-5 w-5 text-primary" />}>
        <div className="flex items-start gap-4">
          <p className="text-sm leading-relaxed">
            {reportData["Justification for the Decision"]}
          </p>
        </div>
      </ReportSection>
    </main>
  );
};

export default Report;
