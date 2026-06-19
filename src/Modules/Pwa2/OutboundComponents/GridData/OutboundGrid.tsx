import { useState, useEffect } from "react";
import OutboundGridData from "../GridData/OutboundGridData";
import ScrapCard, {
  ScrapItem,
} from "../../../../Common/DashboardComponents/ScrapCard";
import OutboundModal from "../../OutboundComponents/Create/OutboundModal";
import ScrapCardSkeleton from "../../../../Common/Components/Skeleton/skeleton";
import { Pagination } from "@mui/material";

type Props = {
  filter: string;
};

export default function OutboundGrid({ filter }: Props) {
  const [selectedItem, setSelectedItem] =
    useState<ScrapItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);

  const itemPerpage = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Reset page when filter changes
  useEffect(() => {
    setpage(1);
  }, [filter]);

  const filteredData =
    filter === "all"
      ? OutboundGridData
      : OutboundGridData.filter(
          (item) =>
            item.status.toLowerCase() === filter.toLowerCase()
        );

  const startIndex = (page - 1) * itemPerpage;
  const paginateddata = filteredData.slice(
    startIndex,
    startIndex + itemPerpage
  );

  return (
    <>
      <div className="scrap-grid">

        {loading
          ? Array.from({ length: 18 }).map((_, i) => (
              <ScrapCardSkeleton key={i} type="scrap"/>
            ))
          : paginateddata.map((item) => (   
              <ScrapCard
                key={item.id}
                item={item}
                mode="outbound"
                onClick={(item) => setSelectedItem(item)} 
              />
            ))}
      </div>

      {/* Pagination UI */}
      {!loading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={Math.ceil(filteredData.length / itemPerpage)}
            page={page}
            onChange={(e, value) => setpage(value)}
          />
        </div>
      )}

      <OutboundModal
        open={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}