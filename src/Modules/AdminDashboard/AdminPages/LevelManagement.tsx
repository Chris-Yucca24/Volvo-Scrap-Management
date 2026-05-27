import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import backArrow from "../../../assets/image-assets/Back_Arrow.png"
import DeleteIcon from "../../../assets/image-assets/bin_delete.png"
import AppButton from "../../../Common/Components/UI/ButtonUI";
import AlertModal from "../../../Common/Components/UI/AlertModal";
import { useState, useEffect } from "react";
import SyncButton from "../../../Common/Components/UI/SyncButton";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import pdfIcon from "../../../assets/image-assets/PDF-img.svg";
import excelIcon from "../../../assets/image-assets/export-logo.svg";
import ExportIcon from "../../../assets/image-assets/FileExport.svg";
import userIcon from "../../../assets/image-assets/userIcon.svg";
import arrowIcon from "../../../assets/image-assets/Down Arrow.png";
import exportIcon from "../../../assets/image-assets/FileExport.svg";

export default function LevelManagement() {
  const tableColumns = [
    { key: "category", label: "Material Category" },
    { key: "partNumber", label: "Part Number" },
    { key: "description", label: "Description" },
  ];

  const tableData = [
    {
      id: 1,
      category: "Category - 1",
      partNumber: "SCRP120001",
      description: "MS & GI Steel Cut Tubes",
    },
    {
      id: 2,
      category: "Category - 1",
      partNumber: "SCRP120002",
      description: "Aluminium Cut Sheet",
    },
    {
      id: 3,
      category: "Category - 1",
      partNumber: "SCRP120003",
      description: "Stainless Steel",
    },
    {
      id: 4,
      category: "Category - 1",
      partNumber: "SCRP120004",
      description: "Rejected Tires",
    },
    {
      id: 5,
      category: "Category - 1",
      partNumber: "SCRP120005",
      description: "Brass Rods & Fittings",
    },
    {
      id: 6,
      category: "Category - 1",
      partNumber: "SCRP120006",
      description: "Bale Patti",
    },
    {
      id: 7,
      category: "Category - 1",
      partNumber: "SCRP120007",
      description: "Plastic Scrap Material",
    },
    {
      id: 8,
      category: "Category - 1",
      partNumber: "SCRP120008",
      description: "Iron Pipe Waste",
    },
  ];

  const handleSync = async () => {
    console.log("Syncing materials...");

    // API call here
    // await fetch(...)
  };
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [alertOpen, setAlertOpen] = useState(false);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",

      }}
    >

      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Box sx={{ display: "flex", alignItems: "center", mb: 1, justifyContent: "space-between" }}>
          <div className="left-user-main">
            <img src={backArrow} alt="back" className="back-main" />
            <div className="filter-title">
              <p>Back</p>
            </div>
          </div>
          <div className="right-sync-content">
            <SyncButton onSync={handleSync} />
          </div>
        </Box>
        <div className="log-user-main">
          <div className="log-left-main">
            <div className="log-header">
              <h3>Log Export</h3>
            </div>
            <div className="left-log-content">
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "12px",
                  boxSizing: "border-box",
                  width: "100%",

                }}
              >
                <div className="export-types">
                  <span className="export-head">Export of</span>

                  <RadioGroup
                    row
                    defaultValue="pdf"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      border: "1px solid #B8B8B8",
                      padding: "0px 5px",
                      borderRadius: "4px",

                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                      <FormControlLabel
                        value="all"
                        control={<Radio size="small" sx={{

                          "&.Mui-checked": {
                            color: "#202A44", // selected color
                          },
                        }} />}
                        label="All"
                      />

                      <Box
                        sx={{
                          width: "1px",
                          height: "70%",
                          backgroundColor: "#bdbdbd",
                          alignSelf: "center",
                          mx: 1,
                        }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                      <FormControlLabel
                        value="inbound"
                        control={<Radio size="small" sx={{

                          "&.Mui-checked": {
                            color: "#202A44", // selected color
                          },
                        }} />}
                        label="Inbound"
                      />

                      <Box
                        sx={{
                          width: "1px",
                          height: "70%",
                          backgroundColor: "#bdbdbd",
                          alignSelf: "center",
                          mx: 1,
                        }}
                      />
                    </Box>


                    <Box sx={{ display: "flex", alignItems: "center", }}>
                      <FormControlLabel
                        value="outbound"
                        control={<Radio size="small"
                          sx={{

                            "&.Mui-checked": {
                              color: "#202A44", // selected color
                            },
                            fontSize: "14px"
                          }} />}
                        label="Outbound"
                      />


                    </Box>

                  </RadioGroup>
                </div>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "12px",
                  boxSizing: "border-box",
                  width: "100%",

                }}
              >
                <div className="Duration-types">
                  <span className="duration-head">Duration</span>
                  <Box className="input-radios">
                    <RadioGroup
                      row
                      defaultValue="pdf"
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        border: "1px solid #B8B8B8",
                        padding: "0px 5px",
                        borderRadius: "4px",
                        width: "fit-content"
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                          value="month"
                          control={<Radio size="small" sx={{

                            "&.Mui-checked": {
                              color: "#202A44", // selected color
                            },
                          }} />}
                          label="Month"
                        />

                        <Box
                          sx={{
                            width: "1px",
                            height: "70%",
                            backgroundColor: "#bdbdbd",
                            alignSelf: "center",
                            mx: 1,
                          }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                          value="quarter"
                          control={<Radio size="small" sx={{

                            "&.Mui-checked": {
                              color: "#202A44", // selected color
                            },
                          }} />}
                          label="Quarter"
                        />

                        <Box
                          sx={{
                            width: "1px",
                            height: "70%",
                            backgroundColor: "#bdbdbd",
                            alignSelf: "center",
                            mx: 1,
                          }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                          value="half"
                          control={<Radio size="small" sx={{

                            "&.Mui-checked": {
                              color: "#202A44", // selected color
                            },
                          }} />}
                          label="Half"
                        />

                        <Box
                          sx={{
                            width: "1px",
                            height: "70%",
                            backgroundColor: "#bdbdbd",
                            alignSelf: "center",
                            mx: 1,
                          }}
                        />
                      </Box>


                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                          value="year"
                          control={<Radio size="small"
                            sx={{

                              "&.Mui-checked": {
                                color: "#202A44", // selected color
                              },
                            }} />}
                          label="Year"
                        />


                      </Box>
                    </RadioGroup>
                    <div className="span-diff">
                      <span>Or</span>
                    </div>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "flex-start",

                        width: {
                          xs: "100%", // mobile
                          sm: "40%",  // tablet
                          md: "40%",  // laptop
                          lg: "40%",  // desktop
                          xl: "50%"
                        },
                      }}
                    >
                      {/* From Date */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                          width: "50%"
                        }}
                      >
                        <label
                          style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#888B8D",
                          }}
                        >
                          From Date
                        </label>

                        <input
                          type="date"
                          style={{
                            padding: "8px 12px",
                            border: "1px solid #B8B8B8",
                            borderRadius: "6px",
                            outline: "none",
                          }}
                        />
                      </div>

                      {/* To Date */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                          width: "50%"
                        }}
                      >
                        <label
                          style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#888B8D",
                          }}
                        >
                          To Date
                        </label>

                        <input
                          type="date"
                          style={{
                            padding: "8px 12px",
                            border: "1px solid #B8B8B8",
                            borderRadius: "6px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </Box>

                  </Box>

                </div>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#fff",
                  p: 1.5,
                  borderRadius: 3,
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <div className="grid-main-log">
                  <span className="log-list-head">Log List</span>

                  <input
                    type="search"
                    placeholder="Search..."
                    style={{

                      padding: "10px 14px",
                      border: "1px solid #B8B8B8",
                      borderRadius: "6px",
                      outline: "none",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div className="log-table-container">
                  {/* Header */}
                  <div className="log-table-header">
                    <div className="checkbox-cell">
                      <input type="checkbox" />
                    </div>

                    {tableColumns.map((column) => (
                      <div key={column.key} className="table-cell header-cell">
                        {column.label}
                      </div>
                    ))}
                  </div>

                  {/* Scrollable Body */}
                  <div className="log-table-body">
                    {tableData.length > 0 ? (
                      tableData.map((row, index) => (
                        <div key={index} className="log-table-row">
                          <div className="checkbox-cell">
                            <input type="checkbox" />
                          </div>

                          <div className="table-cell">{row.category}</div>
                          <div className="table-cell">{row.partNumber}</div>
                          <div className="table-cell">{row.description}</div>
                        </div>
                      ))
                    ) : (
                      <div className="no-data">No logs available</div>
                    )}
                  </div>
                </div>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "20px",

                  boxSizing: "border-box",

                }}
              >
                <div className="document-session">
                  {/* Left Side */}
                  <div className="document-left">
                    <span className="document-title">File Format</span>

                    <button className="format-btn">
                      <img src={pdfIcon} alt="pdf" />
                      PDF
                    </button>

                    <button className="format-btn">
                      <img src={excelIcon} alt="excel" />
                      Excel (.xls)
                    </button>
                  </div>

                  {/* Right Side */}
                  <AppButton variant="filled" className="export-btn">
                    <img src={ExportIcon} alt="export" className="export-icon" />
                    Export Log
                  </AppButton>
                </div>
              </Paper>
            </div>
          </div>
          <div className="log-right-main">
            <div className="log-header">
              <h3>Download History</h3>
              <div className="right-log-content">
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "transparent",
                    // padding: "10px",
                    borderRadius: "12px",
                    boxSizing: "border-box",
                    width: "100%",
                    // height: "71vh",
                    overflowY: "auto"
                  }}
                >
                  <div className="download-history-main">


                    {[1, 2, 3, 4].map((item) => (
                      <div className="download-card" key={item}>

                        {/* Top Section */}
                        <div className="download-top">
                          <div className="download-user-section">
                            <img
                              src={userIcon}
                              alt="user"
                              className="download-user-icon"
                            />

                            <div className="download-user-details">
                              <span className="download-user-name">
                                Purushothama
                              </span>

                              <span className="download-date">
                                14-May-2026 • 2:36pm
                              </span>
                            </div>
                          </div>

                          <div className="download-status-section">
                            <span className="download-status">
                              Success
                            </span>

                            <img
                              src={arrowIcon}
                              alt="arrow"
                              className={`download-arrow ${expandedCards[item] ? "expanded" : ""
                                }`}
                              onClick={() => toggleCard(item)}
                            />
                          </div>
                        </div>

                        {/* Middle Section */}
                        <div className="download-middle">
                          <span className="downloaded-title">
                            Downloaded
                          </span>

                          <div className="downloaded-files">
                            <span>SCRP120001 - MS & GI Steel Cut Tubes</span>
                            <span>SCRP120002 - Aluminium Cut Sheet</span>
                            <span>SCRP120003 - Stainless steel</span>
                          </div>

                          <span className="more-files">
                            +2 more
                          </span>
                        </div>


                        {expandedCards[item] && (
                          <div className="download-bottom">
                            <div className="file-type-section">
                              <span className="file-type-label">
                                File type -
                              </span>

                              <div className="file-type-badge">
                                <img
                                  src={pdfIcon}
                                  alt="pdf"
                                  className="pdf-icon"
                                />

                                <span>PDF</span>
                              </div>
                            </div>

                            <AppButton
                              variant="filled"
                              className="export-history-btn"
                            >
                              <img
                                src={exportIcon}
                                alt="export"
                                className="export-history-icon"
                              />

                              Export
                            </AppButton>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Paper>
              </div>
            </div>

          </div>
        </div>


      </Box>
      <AlertModal
        open={alertOpen}
        onCancel={() => setAlertOpen(false)}
        onConfirm={() => {
          console.log("Level deleted");
          setAlertOpen(false);
        }}
        message="You are about to delete this level. Are you sure you want to continue?"
      />
    </Box>
  );
}