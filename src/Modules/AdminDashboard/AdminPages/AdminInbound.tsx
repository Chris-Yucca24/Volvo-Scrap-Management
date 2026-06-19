import { useState, useEffect } from "react"
import ScrapCard, { ScrapItem } from "../../../Common/DashboardComponents/ScrapCard"
import ScrapCardSkeleton from "../../../Common/Components/Skeleton/skeleton"
import Pagination from "@mui/material/Pagination"
import PopupWithTextarea from "../../../Common/Components/UI/PopupWithTextarea"

type AdminInboundProps = {
  data: ScrapItem[]
  loading?: boolean
  statusFilter?: string
  scheduleFilter?:string
  emptyMessage?: string
}

export default function AdminInbound({
  data,
  loading = false,
  statusFilter = "all",
  scheduleFilter = "all",
  emptyMessage = "No data available"
}: AdminInboundProps) {


  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ScrapItem | null>(null);
  const [page, setPage] = useState(1)
  const handleUnscheduleClick = (item: ScrapItem) => {
  setSelectedItem(item);
  setPopupOpen(true);
  };
  
  const itemsPerPage = 12

//filtering logic
const normalizeDate = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const today = normalizeDate(new Date());
const tomorrow = normalizeDate(new Date());
tomorrow.setDate(tomorrow.getDate() + 1);

//status filter approved,pending,etc
let filteredData = data;

if (statusFilter !== "all") {
  filteredData = filteredData.filter(
    (item) =>
      item.status.toLowerCase().trim() ===
      statusFilter.toLowerCase().trim()
  );
}

//schedule silter today,tomorrow...etc
if (scheduleFilter === "today") {
  filteredData = filteredData.filter((item) => {
    if (!item.scheduledDate) return false;
    const itemDate = normalizeDate(new Date(item.scheduledDate));
    return itemDate.getTime() === today.getTime();
  });
}

if (scheduleFilter === "tomorrow") {
  filteredData = filteredData.filter((item) => {
    if (!item.scheduledDate) return false;
    const itemDate = normalizeDate(new Date(item.scheduledDate));
    return itemDate.getTime() === tomorrow.getTime();
  });
}

if (scheduleFilter === "unscheduled") {
  filteredData = filteredData.filter(
    (item) => !item.scheduledDate
  );
}
  const startIndex = (page - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // reset page when data or filter changes
  useEffect(() => {
    setPage(1)
  }, [data, statusFilter])


  return (
    <>
      <div className="scrap-grid">

        {loading ? (
          Array.from({ length: 18 }).map((_, i) => (
            <div className="admin-inbound-card" key={i}>
              <ScrapCardSkeleton type="scrap" />
            </div>
          ))
        ) : filteredData.length === 0 ? (

          // 🔹 EMPTY STATE
          <div className="empty-state">
            {emptyMessage}
          </div>

        ) : (
          paginatedData.map((item) => (
            <div className="admin-inbound-card" key={item.id}>
              <ScrapCard
                item={item}
                mode="adminInbound"
                onUnscheduleClick={handleUnscheduleClick}
              />
            </div>
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
      <PopupWithTextarea
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={(reason) => {
          console.log("Unschedule:", selectedItem?.id, reason);
          setPopupOpen(false);
        }}
        message={`Do you want to unschedule Scrap ${selectedItem?.id}?`}
      />
    </>
  )
}