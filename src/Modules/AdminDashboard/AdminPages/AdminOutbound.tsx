import { useState, useEffect } from "react";
import { ScrapItem } from "../../../Common/DashboardComponents/ScrapCard";
import AdminOutboundCard from "../AdminComponents/AdminOutboundCard";
import ScrapCardSkeleton from "../../../Common/Components/Skeleton/skeleton";
import Pagination from "@mui/material/Pagination";

type AdminOutboundProps = {
  data: ScrapItem[];
  loading?: boolean;
  statusFilter?: string;
  emptyMessage?: string;
};

export default function AdminOutbound({
  data,
  loading = false,
  statusFilter = "all",
  emptyMessage = "No outbound scrap found",
}: AdminOutboundProps) {

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Filtering logic
  const filteredData =
    statusFilter === "all"
      ? data
      : data.filter(
          (item) =>
            item.status.toLowerCase() === statusFilter.toLowerCase()
        );

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [data, statusFilter]);

  return (
    <>
      <div className="scrap-grid admin-outbound-grid">

        {loading ? (
          Array.from({ length: 18 }).map((_, i) => (
            <div key={i}>
              <ScrapCardSkeleton type="scrap"/>
            </div>
          ))
        ) : filteredData.length === 0 ? (

          <div className="empty-state">
            {emptyMessage}
          </div>

        ) : (
          paginatedData.map((item) => (
            <AdminOutboundCard key={item.id} item={item} />
          ))
        )}

      </div>

      {!loading && filteredData.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      )}
    </>
  );
}