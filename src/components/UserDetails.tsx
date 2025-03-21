
import { CreditReport } from "@/types/credit";
import { Badge } from "@/components/ui/badge";
import { IdCard, User } from "lucide-react";

interface UserDetailsProps {
  report: CreditReport;
}

export default function UserDetails({ report }: UserDetailsProps) {
  return (
    <div className="glass-premium p-6 animate-fade-in animate-delay-100 neo-card">
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
      
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mr-3">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-semibold text-lg gradient-text">User Details</h2>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">User Name</span>
          <div className="flex items-center py-2 pl-3 pr-4 rounded-lg neo-inset hover-scale">
            <User className="h-4 w-4 mr-3 text-muted-foreground" />
            <span className="font-medium">{report.username}</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">PAN Number</span>
          <div className="flex items-center py-2 pl-3 pr-4 rounded-lg neo-inset hover-scale">
            <IdCard className="h-4 w-4 mr-3 text-muted-foreground" />
            <span className="font-medium tracking-wide">{report.panNumber}</span>
            <Badge className="ml-auto bg-gradient-to-r from-primary/20 to-primary/10 text-primary hover:bg-primary/30 hover:text-primary border border-primary/20" variant="secondary">Verified</Badge>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Score Range</span>
          <div className="flex items-center py-2 pl-3 pr-4 rounded-lg neo-inset hover-scale">
            <div className="flex-1 h-2 bg-secondary/60 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]">
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
