
import { CreditReport } from "@/types/credit";
import { Badge } from "@/components/ui/badge";
import { IdCard, User } from "lucide-react";

interface UserDetailsProps {
  report: CreditReport;
}

export default function UserDetails({ report }: UserDetailsProps) {
  return (
    <div className="glass-card p-6 animate-fade-in animate-delay-100">
      <div className="flex items-center mb-6">
        <User className="h-5 w-5 mr-2 text-primary" />
        <h2 className="font-semibold text-lg">User Details</h2>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">User Name</span>
          <div className="flex items-center py-2 pl-3 pr-4 rounded-lg bg-secondary/50">
            <User className="h-4 w-4 mr-3 text-muted-foreground" />
            <span className="font-medium">{report.username}</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">PAN Number</span>
          <div className="flex items-center py-2 pl-3 pr-4 rounded-lg bg-secondary/50">
            <IdCard className="h-4 w-4 mr-3 text-muted-foreground" />
            <span className="font-medium tracking-wide">{report.panNumber}</span>
            <Badge className="ml-auto bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary" variant="secondary">Verified</Badge>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Score Range</span>
          <div className="flex items-center py-2 pl-3 pr-4 rounded-lg bg-secondary/50">
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-credit-poor via-credit-fair to-credit-excellent"
                style={{ borderRadius: "inherit" }}
              />
            </div>
            <span className="ml-3 text-sm font-medium whitespace-nowrap">
              {report.scoreRange.min} - {report.scoreRange.max}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
