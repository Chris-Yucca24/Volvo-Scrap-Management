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
import { useNavigate } from "react-router-dom";
import PopupWithTextarea from "../../../Common/Components/UI/PopupWithTextarea";
import Popup from "../../../Common/Components/UI/popup";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  assembly: boolean;
  inbound: boolean;
  lastupdateddate: string;
};

const roles = ["Super Admin", "Admin", "Engineer", "Sentry"];

const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = 3200 + i;
    const role = roles[Math.floor(Math.random() * roles.length)];

    return {
      id,
      name: `User ${i + 1}`,
      email: `user${i + 1}@volvo.com`,
      role,
      lastupdateddate: getRandomDate(),
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

const getRoleColors = (role: string) => {
  switch (role) {
    case "Super Admin":
      return { bg: "#E1F8E0", text: "#258C20" };
    case "Admin":
      return { bg: "#E1F8E0", text: "#258C20" };
    case "Engineer":
      return { bg: "#DBE5FF", text: "#274799" };
    case "Sentry":
      return { bg: "#EDEDED", text: "#000000" };
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

const stickySecondRow = {
  position: "sticky",
  top: 45,
  backgroundColor: "#fff",
  zIndex: 2,
  padding: "8px 12px", // reduce height
  height: "32px",
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(generateUsers(40));

  // pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleCheckboxChange = (id: number, field: keyof User) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [field]: !user[field] } : user,
      ),
    );
  };
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

  const navigate = useNavigate();

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [users]);

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
                <p>KSPCB Data</p>
              </div>
            </div>

            <div className="right-user-main">
              <div className="right-search-input">
                <div className="search-input-field">
                  <input
                    type="search"
                    placeholder="Search"
                    className="user-search"
                  />
                  <SearchOutlinedIcon style={{ color: "#ccc" }} />
                </div>
              </div>

              {/* <AppButton variant="filled">
            <img src=""></img>
            Add User
          </AppButton> */}
              <button className="btn-filter">
                <img src={filterIcon} className="filter-icon" alt="" />
                Filter
              </button>
              <AppButton
                variant="filled"
                className="add-new-kspcb"
                onClick={() => setShowPopup(true)}
              >
                + Add New KSPCB
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
                  <TableCell sx={stickyTopRow}>KSPCB No</TableCell>
                  <TableCell sx={stickyTopRow}>Waste Description</TableCell>
                  <TableCell sx={stickyTopRow}>Waste Type</TableCell>
                  <TableCell sx={stickyTopRow} align="center">
                    Disposal Method
                  </TableCell>
                  <TableCell sx={stickyTopRow} align="center">
                    Status
                  </TableCell>
                  <TableCell sx={stickyTopRow} align="center">
                    Created By{" "}
                  </TableCell>

                  <TableCell sx={stickyTopRow} align="center">
                    Last Updated{" "}
                  </TableCell>
                  <TableCell sx={stickyTopRow} align="center">
                    Action{" "}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      {" "}
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          backgroundColor: getRoleColors(user.role).bg,
                          color: getRoleColors(user.role).text,
                          fontWeight: 400,
                          borderRadius: "4px",
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">{user.email}</TableCell>

                    <TableCell align="center">
                      <Chip label="active" size="small" />
                    </TableCell>

                    <TableCell align="center">
                      <p> {user.name}</p>
                    </TableCell>

                    <TableCell align="center">
                      <p>
                        {new Date(user.lastupdateddate).toLocaleDateString()}
                      </p>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          setDeleteId(user.id);
                          setAlertOpen(true);
                        }}
                      >
                        <EditOutlinedIcon />
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
}
