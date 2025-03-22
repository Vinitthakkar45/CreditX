import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BureauSelector from "@/components/BureauSelector";
import AnimatedGradient from "@/components/AnimatedGradient";
import CreditSummary from "@/components/CreditSummary";
import UserDetails from "@/components/UserDetails";
import ComparisonChart from "@/components/ComparisonChart";
import LoanSummary from "@/components/LoanSummary";
import BackgroundEffect from "@/components/BackgroundEffect";
import { BureauType } from "@/types/credit";
import { mockCreditReports } from "@/data/mockData";
import { staggerContainer, fadeIn } from "@/utils/animation-variants";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Index = () => {
  const location = useLocation();
  const state = location.state || {};

  function getNormalizedScore(cibil, crif, equifax, experian, loanType) {
    const weightConfig = {
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

    // Calculate normalized score
    const normalizedScore = (cibil * weights.cibil) +
                            (crif * weights.crif) +
                            (equifax * weights.equifax) +
                            (experian * weights.experian);

    return normalizedScore;
}
const [normal, setnormal] = useState<number>(650);

  useEffect(() => {
    if (state.pan_id) {
      const fetchData = async () => {
        try {
          const pan = state.pan_id;
            const cibil = await axios.get(`https://elk-one-mosquito.ngrok-free.app/cibil/?pan_id=${pan}`);
            const equifax = await axios.get(`https://elk-one-mosquito.ngrok-free.app/equifax/?pan_id=${pan}`);
            const experian = await axios.get(`https://elk-one-mosquito.ngrok-free.app/experian/?pan_id=${pan}`);
            const crif_highmark =  await axios.get(`https://elk-one-mosquito.ngrok-free.app/crif_highmark/?pan_id=${pan}`);
            
            console.log(cibil);
            // const score = getNormalizedScore()

          console.log("Fetched data:", );
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [state.pan_id]);
  const [selectedBureau, setSelectedBureau] =
    useState<BureauType>("Normalized Evaluation");

  const handleSelectBureau = (bureau: BureauType) => {
    setSelectedBureau(bureau);
  };

  const currentReport = mockCreditReports[selectedBureau];

  return (
    <AnimatedGradient>
    <div className="flex min-h-screen bg-background overflow-hidden">
      <BackgroundEffect />
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] w-64 h-64 bg-bureau-cibil/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
        <Sidebar title="Dashboard"/>

      <div className="flex-1 pl-64">
        <Header />

          <motion.main
            className="px-8 py-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible">
            <div className="grid grid-cols-12 gap-6">
              {/* Top row */}
              <motion.div
                className="col-span-12 lg:col-span-8"
                variants={fadeIn}>
                <CreditSummary report={currentReport} />
              </motion.div>

              <motion.div
                className="col-span-12 lg:col-span-4"
                variants={fadeIn}>
                <BureauSelector
                  bureauReports={mockCreditReports}
                  selectedBureau={selectedBureau}
                  onSelectBureau={handleSelectBureau}
                />
              </motion.div>

              {/* Middle row */}
              <motion.div
                className="col-span-12 lg:col-span-4"
                variants={fadeIn}>
                <UserDetails report={currentReport} />
              </motion.div>

              <motion.div
                className="col-span-12 lg:col-span-8"
                variants={fadeIn}>
                <ComparisonChart reports={mockCreditReports} />
              </motion.div>

              {/* Bottom row */}
              <motion.div className="col-span-12" variants={fadeIn}>
                <LoanSummary report={currentReport} />
              </motion.div>
            </div>
          </motion.main>
        </div>
      </div>
    </AnimatedGradient>
  );
};

export default Index;
