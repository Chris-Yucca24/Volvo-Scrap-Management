import { useState, useEffect } from "react"
import ScrapCard from "./ScrapCard"
import ScrapCardSkeleton from "../Components/Skeleton/skeleton"
import type { ScrapItem, ScrapMode } from "./ScrapCard"
import Pagination from "@mui/material/Pagination"

type Props = {
  filter: string
  mode?: ScrapMode
  data?: ScrapItem[]  // optional: allow parent to pass data
}

// default data if parent doesn't provide
const defaultData: ScrapItem[] = [
  { id:1, type:"Aluminum", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 90 },

  { id:2, type:"Plastic", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 80 },

  { id:3, type:"Magnesium", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 60 },

  { id:4, type:"Steel", weight:"2kg", status:"Approved", time:"3-02-2026 00:00", holdDays: 90 },

  { id:5, type:"Copper", weight:"99kg", status:"Rejected", time:"3-02-2026 00:00", holdDays: 80 },

  { id:6, type:"Others", weight:"111kg", status:"Overdue", time:"3-02-2026 00:00", holdDays: 60 },

  { id:7, type:"Aluminum", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 90 },

  { id:8, type:"Plastic", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 80 },

  { id:9, type:"Magnesium", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 60 },

  { id:10, type:"Steel", weight:"2kg", status:"Approved", time:"3-02-2026 00:00", holdDays: 90 },

  { id:11, type:"Copper", weight:"99kg", status:"Rejected", time:"3-02-2026 00:00", holdDays: 80 },

  { id:12, type:"Others", weight:"111kg", status:"Overdue", time:"3-02-2026 00:00", holdDays: 60 },

  { id:13, type:"Aluminum", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 90 },

  { id:14, type:"Plastic", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 80 },

  { id:15, type:"Magnesium", weight:"1kg", status:"Pending", time:"3-02-2026 00:00", holdDays: 60 },

  { id:16, type:"Steel", weight:"2kg", status:"Approved", time:"3-02-2026 00:00", holdDays: 90 },

  { id:17, type:"Copper", weight:"99kg", status:"Rejected", time:"3-02-2026 00:00", holdDays: 80 },

  { id:18, type:"Others", weight:"111kg", status:"Overdue", time:"3-02-2026 00:00", holdDays: 60 }
]

export default function ScrapGrid({ filter, mode = "inbound", data: propData }: Props) {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const itemsPerPage = 12

  // use propData if provided, otherwise fallback to defaultData
  const data = propData || defaultData

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500) // simulate loading
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [filter])

  const filteredData =
    filter === "all"
      ? data
      : data.filter((item) => item.status.toLowerCase() === filter.toLowerCase())

  const startIndex = (page - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      <div className="scrap-grid">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => <ScrapCardSkeleton key={i} />)
          : paginatedData.map((item) => (
              <ScrapCard key={item.id} item={item} mode={mode} />
            ))}
      </div>

      {!loading && filteredData.length > itemsPerPage && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      )}
    </>
  )
}