import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Paper,
  Pagination,
} from "@mui/material";

import Delete from "../../../assets/image-assets/bin_delete.png";
import AppButton from "../../../Common/Components/UI/ButtonUI";
import AlertModal from "../../../Common/Components/UI/AlertModal";
import filterIcon from "../../../assets/image-assets/filter.png";
import { useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Popup from "../../../Common/Components/UI/popup";
import SearchField from "../../../Common/DashboardComponents/searchField";

type ScrapPart = {
  id: number;
  partNumber: string;
 partDescription: string;
  kspcbNo: string;
  wasteType: string;
  disposalMethod: string;
  uom: string;
  status: string;
  createdBy: string;
  lastUpdatedDate: Date;
};

const wasteTypes = ["Non-Hazardous", "Hazardous"];

const disposalMethods = [
  "Recycle",
  "Reuse",
  "Incineration",
  "Landfill",
];

const uomList = [
  "KG",
  "Ton",
  "Nos",
  "Litre",
];

const statusActivities = ["Active", "Inactive"];

const createdByUsers = [
  "John David",
  "Chris",
  "Rahul",
  "Priya",
  "Admin",
];


const generateScrapParts = (count: number): ScrapPart[] => {
  return Array.from({ length: count }, (_, i) => {
    const wasteType =
      wasteTypes[Math.floor(Math.random() * wasteTypes.length)];

    const disposalMethod =
      disposalMethods[Math.floor(Math.random() * disposalMethods.length)];

    const uom =
      uomList[Math.floor(Math.random() * uomList.length)];

    const status =
      statusActivities[Math.floor(Math.random() * statusActivities.length)];

    const createdBy =
      createdByUsers[Math.floor(Math.random() * createdByUsers.length)];

    return {
      id: i + 1,
      partNumber: `SP-${1001 + i}`,
      partDescription: `Steel Scrap Part ${i + 1}`,
      kspcbNo: `KSPCB-${5000 + i}`,
      wasteType,
      disposalMethod,
      uom,
      status,
      createdBy,
      lastUpdatedDate: getRandomDate(),
    };
  });
};

// random date generate function
function getRandomDate() {
  const start = new Date(2020, 0, 1); // Jan 1, 2020
  const end = new Date(); // today
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

const getWasteType = (wasteType: string) => {
  switch (wasteType) {
    case "Non-Hazardous":
      return { bg: "#E1F8E0", text: "#258C20" };
    case "Hazardous":
      return { bg: "#FFD8D9", text: "#FB3B40" };

    default:
      return { bg: "#e0e0e0", text: "#000" };
  }
};

const getStatus = (status: string) => {
  switch (status) {
    case "Active":
      return { bg: "#E1F8E0", text: "#258C20" };
    case "Inactive":
      return { bg: "#DBDBDB", text: "#4A4A4A" };
    default:
      return { bg: "#e0e0e0", text: "#000" };
  }
};



const stickyTopRow = {
  position: "sticky",
  top: 0,
  backgroundColor: "#F1F5FC",
  zIndex: 3,
  fontWeight: 500,
  padding: "8px 12px", // reduce height
  height: "32px",
};

export default function UserManagement() {
 const [scrapParts, setScrapParts] =
  useState<ScrapPart[]>(generateScrapParts(40));

  // pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const handleDelete = (id: number) => {
  setScrapParts((prev) =>
    prev.filter((part) => part.id !== id)
  );
};
  const confirmDelete = () => {
    if (deleteId !== null) {
      handleDelete(deleteId);
    }
    setAlertOpen(false);
    setDeleteId(null);
  };

  //   const navigate = useNavigate();

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedScrapParts = scrapParts.slice(
  startIndex,
  startIndex + rowsPerPage
);

useEffect(() => {
  setPage(1);
}, [scrapParts]);

  // add new kspcb popup

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="kspcb-data">
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "10px 20px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Header */}
          <div className="User-task">
            <div className="left-user-main">
              {/* <img src={backArrow} alt="back" className="back-main" /> */}
              <div className="filter-title">
                <p>Scrap Part Number </p>
              </div>
            </div>

            <div className="right-btns-container">
              <SearchField />

              <button className="btn-filter">
                <img src={filterIcon} className="filter-icon" alt="" />
                Filter
              </button>
              <AppButton
                variant="filled"
                className="add-new-kspcb"
                onClick={() => setShowPopup(true)}
              >
                + Add New Scrap Code
              </AppButton>

              <Popup
                open={showPopup}
                message="Enter KSPCB details"
                onClose={() => setShowPopup(false)}
                onConfirm={(value) => {
                  console.log(value);
                  setShowPopup(false);
                }}
              />
            </div>
          </div>

          {/* Table */}
          <Paper
            sx={{
              mt: 1,
              height: {
                xs: "60vh",
                sm: "65vh",
                md: "70vh",
                lg: "63vh",
                // xl: "74vh"
              },
              overflow: "auto",
            }}
          >
            <Table
              stickyHeader
              sx={{
                "& .MuiTableCell-root": {
                  padding: "6px 12px",
                  fontSize: "12px",
                  height: "32px",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={stickyTopRow}>Part Number</TableCell>
<TableCell sx={stickyTopRow}>Part Description</TableCell>
<TableCell sx={stickyTopRow}>KSPCB No</TableCell>
<TableCell sx={stickyTopRow}>Waste Type</TableCell>
<TableCell sx={stickyTopRow}  align="center">Disposal Method</TableCell>
<TableCell sx={stickyTopRow}  align="center">UOM</TableCell>
<TableCell sx={stickyTopRow}  align="center">Status</TableCell>
<TableCell sx={stickyTopRow}  align="center">Created By</TableCell>
<TableCell sx={stickyTopRow}  align="center">Last Updated</TableCell>
<TableCell sx={stickyTopRow}  align="center">Action </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedScrapParts.map((part) => (
                  <TableRow key={part.id} hover>
                    <TableCell>{part.partNumber}</TableCell>
                    <TableCell>{part.partDescription}</TableCell>
                    <TableCell>{part.kspcbNo}</TableCell>
                    <TableCell>
                      {" "}
                      <Chip
                        label={part.wasteType}
                        size="small"
                        sx={{
                          backgroundColor: getWasteType(part.wasteType).bg,
                          color: getWasteType(part.wasteType).text,
                          fontWeight: 500,
                          borderRadius: "4px",
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">{part.disposalMethod}</TableCell>
                     <TableCell align="center">
      {part.uom}
    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={part.status}
                        size="small"
                        sx={{
                          backgroundColor:  getStatus(part.status).bg,
                          color: getStatus(part.status).text,
                          fontWeight: 500,
                          borderRadius: "4px",
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">
                        {part.createdBy}
                    </TableCell>

                    <TableCell align="center">
                      {new Date(part.lastUpdatedDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell align="center" className="kspcb-action-col">
                      <EditOutlinedIcon
                        sx={{
                          width: "20px",
                          verticalAlign: "middle",
                        }}
                      />
                      <IconButton
                        onClick={() => {
                          setDeleteId(part.id);
                          setAlertOpen(true);
                        }}
                      >
                        <img
                          src={Delete}
                          alt="delete"
                          style={{
                            width: "14px",
                            height: "18px",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Pagination */}
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2px 0",
              borderTop: "1px solid #e0e0e0",
              zIndex: 5,
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              boxShadow: "0 -2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <Pagination
             count={Math.ceil(scrapParts.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>
          <AlertModal
            open={alertOpen}
            onCancel={() => {
              setAlertOpen(false);
              setDeleteId(null);
            }}
            onConfirm={confirmDelete}
            message="You are about to delete this user. Are you sure you want to continue?"
          />
        </Box>
      </div>
    </>
  );
}
