
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BureauSelector from "@/components/BureauSelector";
import CreditSummary from "@/components/CreditSummary";
import UserDetails from "@/components/UserDetails";
import ComparisonChart from "@/components/ComparisonChart";
import LoanSummary from "@/components/LoanSummary";
import BackgroundEffect from "@/components/BackgroundEffect";
import { BureauType } from "@/types/credit";
import { mockCreditReports } from "@/data/mockData";

const Index = () => {
  const [selectedBureau, setSelectedBureau] = useState<BureauType>("CIBIL");

  const handleSelectBureau = (bureau: BureauType) => {
    setSelectedBureau(bureau);
  };

  const currentReport = mockCreditReports[selectedBureau];

  return (
    <div className="flex min-h-screen bg-background">
      <BackgroundEffect />
      <Sidebar />
      
      <div className="flex-1 pl-64">
        <Header />
        
        <main className="px-8 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Top row */}
            <div className="col-span-12 lg:col-span-8">
              <CreditSummary report={currentReport} />
            </div>
            
            <div className="col-span-12 lg:col-span-4">
              <BureauSelector 
                bureauReports={mockCreditReports} 
                selectedBureau={selectedBureau}
                onSelectBureau={handleSelectBureau}
              />
            </div>
            
            {/* Middle row */}
            <div className="col-span-12 lg:col-span-4">
              <UserDetails report={currentReport} />
            </div>
            
            <div className="col-span-12 lg:col-span-8">
              <ComparisonChart reports={mockCreditReports} />
            </div>
            
            {/* Bottom row */}
            <div className="col-span-12">
              <LoanSummary report={currentReport} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
