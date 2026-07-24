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

type User = {
  id: number;
  SourceName: string;
  ScrapsCollected: string;
  AddedBy: string;
  ModifiedDate: Date;
  status: string;
  DestinationName: string;
};
const sourceColumns = [
  { field: "id", header: "Source Code" },
  { field: "SourceName", header: "Source Name" },
  { field: "ScrapsCollected", header: "Scraps Collected" },
  { field: "AddedBy", header: "Added By" },
  { field: "ModifiedDate", header: "Modified Date" },
  { field: "status", header: "Status" },
  { field: "Action", header: "Action" },
];

const destinationColumns = [
  { field: "id", header: "Destination Code" },
  { field: "DestinationName", header: "Destination Name" },
  { field: "AddedBy", header: "Added By" },
  { field: "ModifiedDate", header: "Modified Date" },
  { field: "status", header: "Status" },
  { field: "Action", header: "Action" },
];
const statusActivities = ["Active", "Inactive"];

const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = 2727 + i;

    const status =
      statusActivities[Math.floor(Math.random() * statusActivities.length)];
    return {
      id,
      SourceName: `Steel Scrap ${i + 1}`,
      ScrapsCollected: `User ${i + 1}`,
      AddedBy: `Recycle`,
      DestinationName: `Hazardous Yard`,
      ModifiedDate: getRandomDate(),
      status,
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

const AdminSourceDestination = () => {
  const [users, setUsers] = useState<User[]>(generateUsers(40));

  // pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };
  const confirmDelete = () => {
    if (deleteId !== null) {
      handleDelete(deleteId);
    }
    setAlertOpen(false);
    setDeleteId(null);
  };

  const [showPopup, setShowPopup] = useState(false);
  const tabs = ["Source Management", "Destination Management"];
  const [sourceUsers, setSourceUsers] = useState<User[]>(generateUsers(40));
  const [destinationUsers, setDestinationUsers] = useState<User[]>(
    generateUsers(40),
  );
  const [activeTab, setActiveTab] = useState("Source Management");

  const currentData =
    activeTab === "Source Management" ? sourceUsers : destinationUsers;

  const startIndex = (page - 1) * rowsPerPage;
  // const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);
  const paginatedUsers = currentData.slice(
    startIndex,
    startIndex + rowsPerPage,
  );
  const columns =
    activeTab === "Source Management" ? sourceColumns : destinationColumns;
  useEffect(() => {
    setPage(1);
  }, [users]);

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
                <div
                  style={{ display: "flex", gap: "10px" }}
                >
                  {tabs.map((tab) => (
                    <div
                      className="source-tab-wrapper"
                      style={{
                        padding: activeTab === tab ? "1.3px" : "0px",
                        background:
                          activeTab === tab
                            ? "linear-gradient(to bottom, #EAF2FF , #012F6E) "
                            : "#fff",
                      }}
                    >
                      <div
                        className="source-management-tab"
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                          padding: "10px 20px",
                          cursor: "pointer",
                          background: "#fff",
                          color: activeTab === tab ? "#000" : "#9D9D9D",
                        }}
                      >
                        {tab}
                      </div>
                    </div>
                  ))}
                </div>
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
                {activeTab === "Source Management"
                  ? "+ Add New Source"
                  : "+ Add New Destination"}
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
                  {columns.map((col: any) => (
                    <TableCell key={col.field} sx={stickyTopRow}>
                      {col.header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    {columns.map((col: any) => (
                      <TableCell key={col.field}>
                        {col.field === "ModifiedDate" ? (
                          <p>
                            {new Date(user.ModifiedDate).toLocaleDateString()}
                          </p>
                        ) : col.field === "status" ? (
                          <Chip
                            label={user.status}
                            sx={{
                              backgroundColor: getStatus(user.status).bg,
                              color: getStatus(user.status).text,
                              borderRadius: "6px",
                              padding: "0px",
                              height: "25px",
                              fontWeight:'500'
                            }}
                          />
                        ) : col.field === "Action" ? (
                          <div className="action-col">
                            <EditOutlinedIcon
                              sx={{
                                width: "20px",
                                verticalAlign: "middle",
                              }}
                            />
                            <IconButton
                              onClick={() => {
                                setDeleteId(user.id);
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
                          </div>
                        ) : (
                          String(user[col.field as keyof User] ?? "-")
                        )}
                      </TableCell>
                    ))}
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
              count={Math.ceil(users.length / rowsPerPage)}
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
};

export default AdminSourceDestination;
