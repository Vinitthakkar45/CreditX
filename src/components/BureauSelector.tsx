
import { getBureauColor } from "@/data/mockData";
import { BureauType, CreditReport } from "@/types/credit";
import { Button } from "@/components/ui/button";
import { CreditCard, Info, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface BureauSelectorProps {
  bureauReports: Record<BureauType, CreditReport>;
  selectedBureau: BureauType;
  onSelectBureau: (bureau: BureauType) => void;
}

export default function BureauSelector({ 
  bureauReports, 
  selectedBureau, 
  onSelectBureau 
}: BureauSelectorProps) {
  const [isRefreshing, setIsRefreshing] = useState<BureauType | null>(null);
  const { toast } = useToast();

  const handleRefresh = (bureau: BureauType) => {
    setIsRefreshing(bureau);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(null);
      toast({
        title: "Bureau Data Refreshed",
        description: `Successfully refreshed ${bureau} credit data.`,
        duration: 3000,
      });
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          <h2 className="font-semibold text-lg">Select Credit Bureau</h2>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="glass-dark border-0">
              <p className="max-w-xs text-sm">
                Credit scores vary between bureaus as they use different data sources and calculation methodologies.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-3">
        {Object.values(bureauReports).map((report, index) => {
          const bureau = report.bureau;
          const bureauColor = getBureauColor(bureau);
          const isSelected = selectedBureau === bureau;
          const isCurrentlyRefreshing = isRefreshing === bureau;

          return (
            <div
              key={bureau}
              className={`glass rounded-xl p-4 transition-all duration-300 animate-fade-in hover:shadow-lg ${
                isSelected ? "border-primary/40 bg-white/10" : "border-transparent"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSelectBureau(bureau)}
                  className="flex items-center flex-1"
                >
                  <div 
                    className={`h-3 w-3 rounded-full mr-3 bg-${bureauColor}`}
                  />
                  <div className="text-left">
                    <h3 className="font-medium">{bureau}</h3>
                    <p className="text-xs text-muted-foreground">
                      Updated: {formatDate(report.lastUpdated)}
                    </p>
                  </div>
                </button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefresh(bureau);
                  }}
                  disabled={isCurrentlyRefreshing}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      isCurrentlyRefreshing ? "animate-spin" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
