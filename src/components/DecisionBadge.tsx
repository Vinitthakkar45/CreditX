import { motion } from "framer-motion";

type DecisionType = "approve" | "approve with conditions" | "decline";

interface DecisionBadgeProps {
  decision: string;
}

const DecisionBadge = ({ decision }: DecisionBadgeProps) => {
  const getDecisionType = (): DecisionType => {
    const lowerCase = decision.toLowerCase();
    if (lowerCase.includes("decline") || lowerCase.includes("reject")) return "decline";
    if (lowerCase.includes("condition")) return "approve with conditions";
    return "approve";
  };

  const getColorClass = (type: DecisionType) => {
    switch (type) {
      case "approve":
        return "bg-status-approved/20 text-status-approved border-status-approved/30";
      case "approve with conditions":
        return "bg-status-pending/20 text-status-pending border-status-pending/30";
      case "decline":
        return "bg-status-rejected/20 text-status-rejected border-status-rejected/30";
    }
  };

  const decisionType = getDecisionType();
  const colorClass = getColorClass(decisionType);

  return (
    <motion.div
      className={`inline-flex items-center px-4 py-2 rounded-lg border ${colorClass} text-sm font-medium`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {decisionType === "approve" && (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {decisionType === "approve with conditions" && (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )}
      {decisionType === "decline" && (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {decision}
    </motion.div>
  );
};

export default DecisionBadge;