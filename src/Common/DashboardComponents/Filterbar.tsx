import { useState } from "react"
import filterIcon from "../../assets/image-assets/filter.png";
import FilterModal from "./FilterModal"
import AppButton from "../Components/UI/ButtonUI"

type FilterBarProps = {
  mode?: "inbound" | "outbound" | "adminInbound" | "adminOutbound" 
  onFilterChange?: (value: string) => void
  counts?: {
    today: number
    tomorrow: number
    unscheduled:number
  }
}

export default function FilterBar({ mode = "inbound",onFilterChange, counts }: FilterBarProps) {

  const isOutbound = mode === "outbound";
  const isAdminInbound = mode === "adminInbound";


  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState("All")

  const handleFilterClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)

  return (
    <div className="filter-row">
      {!isAdminInbound && (
        <div className="filter-title">Scrap</div>
      )}

      {isAdminInbound && (
        <div className="admin-filter-tabs">
          <AppButton
            className="admin-filter-btn"
            variant={activeTab === "All" ? "filled" : "outlined"}
            onClick={() => {
              setActiveTab("All")
              onFilterChange?.("all")
            }}
          >
          <div className="scheduled-label">
            All
          </div>
          </AppButton>

          <AppButton
            className="admin-filter-btn"
            variant={activeTab === "Today" ? "filled" : "outlined"}
            onClick={() => {
              setActiveTab("Today")
              onFilterChange?.("today")
            }}
          >
          <div className="scheduled-label">
            60 days ({counts?.today ?? 0})
          </div>
          </AppButton>

          <AppButton
            className="admin-filter-btn"
            variant={activeTab === "Tomorrow" ? "filled" : "outlined"}
            onClick={() => {
              setActiveTab("Tomorrow")
              onFilterChange?.("tomorrow")
            }}
          >
          <div className="scheduled-label">
            80 days ({counts?.tomorrow ?? 0})
          </div>
          </AppButton>

          <AppButton
            className="admin-filter-btn"
            variant={activeTab === "Unscheduled" ? "filled" : "outlined"}
            onClick={() => {
            setActiveTab("Unscheduled")
            onFilterChange?.("unscheduled")
          }}
          >
          <div className="scheduled-label">
            90 days ({counts?.unscheduled ?? 0})
          </div>
          </AppButton>
        </div>
      )}

      <div className="filter-controls">

        {!isOutbound && (
          <>
            <input type="search"
              className="input"
              placeholder="Search"
            />

            <div className="sort-group">
              <span className="sort-label">Sort By </span>

              <select className="input">
                <option value="">Select</option>
                <option>Others</option>
                <option>Aluminium</option>
                <option>Magnesium</option>
              </select>
            </div>
          </>
        )}

        <button
          className="btn-filter"
          onClick={handleFilterClick}
        >
        <img
            src={filterIcon}
            className="filter-icon"
            alt=""
        />
          Filter
        </button>

        <FilterModal
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        />
      </div>
    </div>
  );
}



