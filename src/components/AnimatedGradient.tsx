
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "strong";
  color1?: string;
  color2?: string;
  duration?: number;
}

export default function AnimatedGradient({
  children,
  className = "",
  intensity = "medium",
  color1 = "rgba(59, 130, 246, 0.5)",
  color2 = "rgba(139, 92, 246, 0.5)",
  duration = 8,
}: AnimatedGradientProps) {
  const intensityValues = {
    light: 0.1,
    medium: 0.2,
    strong: 0.4,
  };

  const opacityValue = intensityValues[intensity];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2}, ${color1})`,
          backgroundSize: "400% 400%",
          opacity: opacityValue,
          filter: "blur(120px)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
