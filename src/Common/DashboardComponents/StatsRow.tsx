import { useState, useEffect } from "react";
import ScrapCardSkeleton from "../Components/Skeleton/skeleton"; 

type StatsRowProps = {
  variant?: "default" | "adminInbound" | "adminOutbound" | "inbound" | "outbound" | "l1l2l3" | "financeTeam";
  onFilterChange?: (filter: string) => void;
  data?: any[];
  activeFilter?: string; 
};

export default function StatsRow({
  variant = "default",
  onFilterChange,
  data,
  activeFilter: externalFilter = "all" 
}: StatsRowProps) {

  const [activeFilter, setActiveFilter] = useState<string>("all"); // ✅ kept
  const [loading, setLoading] = useState<boolean>(true); 

  const defaultStats = [
    { label: "All Scrap",  type: "all" },
    { label: "Pending",  type: "pending" },
    { label: "Rejected",  type: "rejected" },
    { label: "Overdue",  type: "overdue" },
    { label: "Approved",  type: "approved" },
  ];

  const inboundStats = [
    { label: "All Scrap",  type: "all" },
    { label: "Pending",  type: "pending" },
    { label: "Rejected",  type: "rejected" },
    { label: "Overdue",  type: "overdue" },
    { label: "Approved",  type: "approved" },
  ];

  const adminInboundStats = [
    { label: "All Scrap",  type: "all" },
    { label: "Pending",  type: "pending" },
    { label: "Rejected",  type: "rejected" },
    { label: "Approved",  type: "approved" },
  ];

  const adminOutboundStats = [
    { label: "All Scrap",  type: "all" },
    { label: "Pending",  type: "pending" },
    { label: "Rejected",  type: "rejected" },
    { label: "Finance Pending",  type: "pending by finance team" }, 
    { label: "Approved",  type: "approved" },
    { label: "Challan Generated",  type: "challan generated" }
  ];

  const outboundStats = [
    { label: "All Scrap", type: "all" }, 
    { label: "Pending",  type: "pending" },
    { label: "Resubmitted",  type: "resubmitted" },
    { label: "Draft",  type: "draft" },
    { label: "Sent For Approval",  type: "sent for approval" }
  ];

  const l1l2l3Stats = [
    { label: "All Scrap",  type: "all" },
    { label: "Pending",  type: "pending" },
    { label: "Rejected",  type: "rejected" },
    { label: "Approved",  type: "approved" },    
  ];

  const financeStats = [
    { label: "All Scrap",  type: "all" },
    { label: "Pending",  type: "pending" },
    { label: "Rejected",  type: "rejected" },
    { label: "Overdue", type:"overdue" },
    { label: "Challan Generated",  type: "challan generated" },
  ];  

  const statsMap = {
    default: defaultStats,
    adminInbound: adminInboundStats,
    adminOutbound: adminOutboundStats,
    outbound: outboundStats,
    inbound: inboundStats,
    l1l2l3: l1l2l3Stats,
    financeTeam: financeStats,
  };

  const countByStatus = (status: string) => {
    if (!data) return 0;

    if (status === "all") return data.length;

    return data.filter(
      (item) => item.status?.toLowerCase() === status.toLowerCase()
    ).length;
  };

 

  const stats = statsMap[variant] || [];

  const handleClick = (label: string) => {
    setActiveFilter(label);         
    onFilterChange?.(label);       
  };

  //  Simulated loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  //  NEW: Sync parent filter → local state
  useEffect(() => {
    if (externalFilter !== undefined) {
      setActiveFilter(externalFilter);
    }
  }, [externalFilter]);

  return (
    <div className={`stats-row ${variant}`}>
      {loading
        ? stats.map((_, i) => <ScrapCardSkeleton key={i} />) 
        : stats.map((s, i) => (
            <div
              key={i}
              className={`stat-card ${s.type} ${
                activeFilter === s.type ? "active" : ""
              }`}
              data-status={s.type}
              onClick={() => handleClick(s.type)}
            >
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{countByStatus(s.type)}</div>
            </div>
          ))}
    </div>
  );
}