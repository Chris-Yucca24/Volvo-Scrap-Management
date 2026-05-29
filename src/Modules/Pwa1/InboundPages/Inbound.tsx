import { useState } from "react"
import AppLayout from "../../../layouts/AppLayout"
import StatsRow from "../../../Common/DashboardComponents/StatsRow"
import FilterBar from "../../../Common/DashboardComponents/Filterbar"
import ScrapGrid from "../../../Common/DashboardComponents/ScrapGrid"
import SyncButton from "../../../Common/Components/UI/SyncButton"
import AppButton from "../../../Common/Components/UI/ButtonUI"

export default function Inbound() {

  const [filter, setFilter] = useState("all")
  const [openModal, setOpenModal] = useState(false)

const scrapData = [
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
]

  return (
    <AppLayout
      header={
        <>
          <div className="flex-between">
            <h2 className="page-title">Sentry Dashboard</h2>
            <SyncButton />
          </div>

          <StatsRow
            variant="inbound"
            onFilterChange={setFilter}
            data={scrapData}
            activeFilter={filter}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1 }}>
              <FilterBar mode="inbound" />
            </div>

            <AppButton
              variant="filled"
              onClick={() => setOpenModal(true)}
              style={{
                marginTop: "10px",
              }}
            >
              Add New
            </AppButton>
          </div>
        </>
      }
    >
      <ScrapGrid
        filter={filter}
        data={scrapData}
        
      />

      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">

            <h3>Add Scrap</h3>

            <div className="form-group">
              <label>KSPCB Category</label>

              <select defaultValue="" required>
                <option value="" disabled hidden>
                  Select Category
                </option>

                <option>Metal</option>
                <option>Plastic</option>
                <option>Paper</option>
              </select>
            </div>

            <div className="form-group">
              <label>Material Type</label>

              <select defaultValue="" required>
                <option value="" disabled hidden>
                  Select Part
                </option>

                <option>Plastic</option>
                <option>Metal</option>
                <option>MS & GI Steel Cut Tubes-SCRP120001</option>
              </select>
            </div>

            <div className="double-row">

              <div className="form-group">
                <label>Source</label>

                <select defaultValue="" required>
                  <option value="" disabled hidden>
                    Select Source
                  </option>

                  <option>Gate 1</option>
                  <option>Gate 2</option>
                </select>
              </div>

              <div className="form-group">
                <label>Material weight in KG</label>

                <select defaultValue="" required>
                  <option value="" disabled hidden>
                    Select Weight
                  </option>

                  <option>10 KG</option>
                  <option>20 KG</option>
                  <option>30 KG</option>
                </select>
              </div>

            </div>

            <div className="modal-actions">
              <AppButton
                variant="outlined"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </AppButton>

              <AppButton>
                Save
              </AppButton>
            </div>

          </div>
        </div>
      )}

    </AppLayout>
  )
}