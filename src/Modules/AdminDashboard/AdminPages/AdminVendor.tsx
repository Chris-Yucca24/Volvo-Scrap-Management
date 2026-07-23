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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AlertModal from "../../../Common/Components/UI/AlertModal";
import filterIcon from "../../../assets/image-assets/filter.png";
import { useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import { useNavigate } from "react-router-dom";
import Popup from "../../../Common/Components/UI/popup";
import SearchField from "../../../Common/DashboardComponents/searchField";

type Vendor = {
  id: number;
  vendorCode: string;
  vendorName: string;
  materialType: string;
  contactPerson: string;
  status: string;
  mobileNo: string;
  lastUpdatedDate: Date;
};

const materialTypes = [
  "Steel Scrap",
  "Plastic",
  "Paper",
  "E-Waste",
  "Chemical Waste",
];

const statusActivities = ["Active", "Inactive"];
const generateVendors = (count: number): Vendor[] => {
  return Array.from({ length: count }, (_, i) => {
    const materialType =
      materialTypes[Math.floor(Math.random() * materialTypes.length)];

    const status =
      statusActivities[Math.floor(Math.random() * statusActivities.length)];

    return {
      id: i + 1,
      vendorCode: `VEN-${1001 + i}`,
      vendorName: `Vendor ${i + 1}`,
      materialType,
      contactPerson: `Contact Person ${i + 1}`,
      status,
      mobileNo: `+91 98${Math.floor(10000000 + Math.random() * 89999999)}`,
    };
  });
};

// random date generate function
// function getRandomDate() {
//   const start = new Date(2020, 0, 1); // Jan 1, 2020
//   const end = new Date(); // today
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime()),
//   );
// }

const getMaterialType = (materialType: string) => {
  switch (materialType) {
    case "Steel Scrap":
      return { bg: "#E8F5E9", text: "#2E7D32" }; // Green

    case "Plastic":
      return { bg: "#E3F2FD", text: "#1565C0" }; // Blue

    case "Paper":
      return { bg: "#FFF8E1", text: "#F9A825" }; // Yellow

    case "E-Waste":
      return { bg: "#F3E5F5", text: "#7B1FA2" }; // Purple

    case "Chemical Waste":
      return { bg: "#FFEBEE", text: "#C62828" }; // Red

    default:
      return { bg: "#EEEEEE", text: "#616161" };
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
const [vendors, setVendors] = useState<Vendor[]>(generateVendors(40));

  // pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
const handleDelete = (id: number) => {
  setVendors((prev) => prev.filter((vendor) => vendor.id !== id));
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
 const paginatedVendors = vendors.slice(
  startIndex,
  startIndex + rowsPerPage
);
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
                <p>Vendor Management</p>
              </div>
            </div>

            <div className="right-user-main">
              <div className="right-search-input">
                <div className="search-input">
                   <SearchField />
                </div>
              </div>

              <AppButton variant="outlined" className="btn-filter">
                <img src={filterIcon} className="filter-icon" alt="" />
                Filter
              </AppButton>
              <AppButton
                variant="filled"
                className="add-new-kspcb"
                onClick={() => setShowPopup(true)}
              >
                + Add New Vendor
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
                lg: "70vh",
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
                  <TableCell sx={stickyTopRow}>Vendor Code</TableCell>
                  <TableCell sx={stickyTopRow}>Vendor Name</TableCell>
                  <TableCell sx={stickyTopRow}>Material Type</TableCell>
                  <TableCell sx={stickyTopRow} align="center">
                    Contact Person
                  </TableCell>
                  <TableCell sx={stickyTopRow} align="center">
                    Status
                  </TableCell>
                  <TableCell sx={stickyTopRow} align="center">
                    Mobile No.
                  </TableCell>

                 
                  <TableCell sx={stickyTopRow} align="center">
                    Action{" "}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedVendors.map((vendor) => (
                  <TableRow key={vendor.vendorCode} hover>
                    <TableCell>{vendor.vendorCode}</TableCell>
                    <TableCell>{vendor.vendorName}</TableCell>
                    <TableCell>
                      {" "}
                      <Chip
                        label={vendor.materialType}
                        size="small"
                       sx={{
    backgroundColor: getMaterialType(vendor.materialType).bg,
    color: getMaterialType(vendor.materialType).text,
    fontWeight: 500,
    borderRadius: "4px",
  }}
                      />
                    </TableCell>

                    <TableCell align="center"> {vendor.contactPerson}</TableCell>

                    <TableCell align="center">
                      <Chip label={vendor.status} size="small"
                        sx={{
                          backgroundColor: getStatus(vendor.status).bg,
                          color: getStatus(vendor.status).text,
                          fontWeight: 500,
                          borderRadius: "4px", }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <p>{vendor.mobileNo}</p>
                    </TableCell>

                    

                    <TableCell align="center" className="kspcb-action-col">
                      <EditOutlinedIcon
                        sx={{
                          width: "20px",
                          verticalAlign:"middle",
                        }}
                      />
                      <IconButton
                        onClick={() => {
                          setDeleteId(vendor.id);
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
              count={Math.ceil(vendors.length / rowsPerPage)}
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
