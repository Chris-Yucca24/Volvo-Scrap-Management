import { useState, useEffect } from "react"
import AppLayout from "../../../layouts/AppLayout"
import ScrapCard, { ScrapItem } from "../../../Common/DashboardComponents/ScrapCard"
import FilterBar from "../../../Common/DashboardComponents/Filterbar"
import AssemblyNavigationTabs from "../../../Common/Components/UI/AssemblyNavigationTabs"
import AdminInbound from "./AdminInbound"
import AdminOutbound from "./AdminOutbound"
import StatsRow from "../../../Common/DashboardComponents/StatsRow"
import SyncButton from "../../../Common/Components/UI/SyncButton"
import ScrapCardSkeleton from "../../../Common/Components/Skeleton/skeleton"
import { Pagination } from "@mui/material"


const dateContext=(days: number)=>{
  const d=new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
};

const mockData1: ScrapItem[] = Array.from({ length: 18 }, (_, i) => ({
  id: 155 + i * 2,
  type: "Aluminium",
  weight: `${80 + i * 3}kg`,
  status: "Pending",
  time: "12-01-2026 16:40:29",
}))

const mockData2: ScrapItem[] = Array.from({ length: 19 }, (_, i) => ({
  id: 155 + i * 2,
  type: "Aluminium",
  weight: `${80 + i * 3}kg`,
  status: "Approved",
  time: "12-01-2026 16:40:29",

  holdDays:
    i % 3 === 0
      ? 60
      : i % 3 === 1
      ? 80
      : 90,

  scheduledDate:
    i % 3 === 0
      ? dateContext(0)
      : i % 3 === 1
      ? dateContext(1)
      : undefined
}));

const mockData3: ScrapItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: 155 + i * 2,
  type: "Aluminium",
  weight: `${80 + i * 3}kg`,
  status: "Challan Generated",
  time: "12-01-2026 16:40:29",
}))

const mockData4: ScrapItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: 155 + i * 2,
  type: "Plastic",
  weight: `${80 + i * 3}kg`,
  status: "Pending by Finance Team",
  time: "12-01-2026 16:40:29",
}))

const normalizeDate = (date: Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const today = normalizeDate(new Date())

const tomorrow = normalizeDate(new Date())
tomorrow.setDate(tomorrow.getDate() + 1)

// Count for scrap items for admin inbound
const counts = {
  today: mockData2.filter(item => {
    if (!item.scheduledDate) return false
    const itemDate = normalizeDate(new Date(item.scheduledDate))
    return itemDate.getTime() === today.getTime()
  }).length,

  tomorrow: mockData2.filter(item => {
    if (!item.scheduledDate) return false
    const itemDate = normalizeDate(new Date(item.scheduledDate))
    return itemDate.getTime() === tomorrow.getTime()
  }).length,

  unscheduled: mockData2.filter(item => !item.scheduledDate).length
}

export default function AdminAssembly() {

  const [activeTab, setActiveTab] = useState("Assembly")
  const [loading, setLoading] = useState(true)

  const [statusFilter, setStatusFilter] = useState("all")
  const [scheduleFilter, setScheduleFilter] = useState("all")

  // pagination state
  const [page, setPage] = useState(1)
  const itemsPerPage = 18

  // initial page load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // loading when switching tabs
  useEffect(() => {
    setLoading(true)
    setPage(1)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [activeTab])

  const getFilterMode = () => {
    switch (activeTab) {
      case "Assembly":
        return "inbound"
      case "Inbound":
        return "adminInbound"
      case "Outbound":
        return "adminOutbound"
      default:
        return "inbound"
    }
  }

  // pagination calculation
  const startIndex = (page - 1) * itemsPerPage
  const paginatedAssembly = mockData1.slice(startIndex, startIndex + itemsPerPage)

  const header = (
    <>
      <div className="flex-between">
        <AssemblyNavigationTabs
          value={activeTab as "Assembly" | "Inbound" | "Outbound"}
          onChange={setActiveTab}
        />
        <SyncButton />
      </div>

     {activeTab === "Inbound" && (
        <StatsRow
          variant="adminInbound"
          onFilterChange={setStatusFilter}
          data={mockData2}
        />
      )}

      {activeTab === "Outbound" && (
      <StatsRow
        variant="adminOutbound"
        onFilterChange={setStatusFilter}
        data={[...mockData1, ...mockData2, ...mockData3, ...mockData4]}
      />
    )}

      <FilterBar 
      mode={getFilterMode()} 
      onFilterChange={setScheduleFilter} 
      counts={counts}/>
    </>
  )

  return (
    <AppLayout
      header={header}
      showSettings={true}
      onSettingsClick={() => console.log("Settings clicked")}
    >
      <div className="admin-content">

        {activeTab === "Assembly" && (
          <>
            <div className="scrap-grid">
              {loading
                ? Array.from({ length: 18 }).map((_, i) => (
                    <ScrapCardSkeleton key={i} />
                  ))
                : paginatedAssembly.map((item) => (
                    <ScrapCard
                      key={item.id}
                      item={item}
                      mode="outbound"
                    />
                  ))}
            </div>

            {!loading && (
              <div className="pagination-wrapper">
                <Pagination
                  count={Math.ceil(mockData1.length / itemsPerPage)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </div>
            )}
          </>
        )}

        {activeTab === "Inbound" && (
            <AdminInbound
              data={mockData2}
              loading={loading}
              statusFilter={statusFilter}
              scheduleFilter={scheduleFilter}
              emptyMessage="No inbound scrap found"
            />
          )}

        {activeTab === "Outbound" && (
        <AdminOutbound
          data={[...mockData1, ...mockData2, ...mockData3, ...mockData4]}
          loading={loading}
          statusFilter={statusFilter}
          emptyMessage="No outbound scrap found"
        />
      )}

      </div>
    </AppLayout>
  )
}