import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Pagination
} from "@mui/material";

import Delete from "../../../assets/image-assets/bin_delete.png";
import AppButton from "../../../Common/Components/UI/ButtonUI";
import backArrow from "../../../assets/image-assets/Back_Arrow.png";
import AlertModal from "../../../Common/Components/UI/AlertModal";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  assembly: boolean;
  inbound: boolean;
  l1: boolean;
  l2: boolean;
  l3: boolean;
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
      assembly: Math.random() > 0.5,
      inbound: Math.random() > 0.5,
      l1: Math.random() > 0.5,
      l2: Math.random() > 0.5,
      l3: Math.random() > 0.5
    };
  });
};

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
  backgroundColor: "#fff",
  zIndex: 3,
  fontWeight: 500
};

const stickySecondRow = {
  position: "sticky",
  top: 45,
  backgroundColor: "#fff",
  zIndex: 2
};

export default function UserManagement() {

  const [users, setUsers] = useState<User[]>(generateUsers(40));

  // pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleCheckboxChange = (id: number, field: keyof User) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [field]: !user[field] } : user
      )
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

  return (
    <Box>

      {/* Header */}
      <div className="User-task">
        <div className="left-user-main"  onClick={()=> navigate(-1)}>
          <img src={backArrow} alt="back" className="back-main"  />
          <div className="filter-title">
            <p>User Management</p>
          </div>
        </div>

        <div className="right-user-main">
          <input
            type="search"
            placeholder="Search user...."
            className="user-search"
          />
          <AppButton variant="filled">
            Add user
          </AppButton>
          <AppButton variant="outlined">
            Save changes 
          </AppButton>
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
            xl: "76vh"
          },
          overflow: "auto"
        }}
      >

        <Table stickyHeader>

          <TableHead>

            <TableRow>
              <TableCell sx={stickyTopRow}>Employee ID</TableCell>
              <TableCell sx={stickyTopRow}>User Name</TableCell>
              <TableCell sx={stickyTopRow}>Email ID</TableCell>
              <TableCell sx={stickyTopRow} align="center">Role</TableCell>
              <TableCell sx={stickyTopRow} align="center">Inbound</TableCell>
              <TableCell sx={stickyTopRow} align="center">outbound</TableCell>
              <TableCell sx={stickyTopRow} align="center" colSpan={3}>
                Outbound Approver
              </TableCell>
              <TableCell sx={stickyTopRow} align="center">Action</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={stickySecondRow} />
              <TableCell sx={stickySecondRow} />
              <TableCell sx={stickySecondRow} />
              <TableCell sx={stickySecondRow} />
              <TableCell sx={stickySecondRow} />
              <TableCell sx={stickySecondRow} />
              <TableCell sx={stickySecondRow} align="center">L1</TableCell>
              <TableCell sx={stickySecondRow} align="center">L2</TableCell>
              <TableCell sx={stickySecondRow} align="center">L3</TableCell>
              <TableCell sx={stickySecondRow} />
            </TableRow>

          </TableHead>

          <TableBody>

            {paginatedUsers.map((user) => (
              <TableRow key={user.id} hover>

                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell align="center">
                  <Chip
                    label={user.role}
                    size="small"
                    sx={{
                      backgroundColor: getRoleColors(user.role).bg,
                      color: getRoleColors(user.role).text,
                      fontWeight: 400,
                      borderRadius: "4px"
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={user.assembly}
                    onChange={() =>
                      handleCheckboxChange(user.id, "assembly")
                    }
                    size="small"
                    sx={{
                      color: "#202A44",
                      "&.Mui-checked": { color: "#202A44" }
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={user.inbound}
                    onChange={() =>
                      handleCheckboxChange(user.id, "inbound")
                    }
                    size="small"
                    sx={{
                      color: "#202A44",
                      "&.Mui-checked": { color: "#202A44" }
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={user.l1}
                    onChange={() => handleCheckboxChange(user.id, "l1")}
                    size="small"
                    sx={{
                      color: "#202A44",
                      "&.Mui-checked": { color: "#202A44" }
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={user.l2}
                    onChange={() => handleCheckboxChange(user.id, "l2")}
                    size="small"
                    sx={{
                      color: "#202A44",
                      "&.Mui-checked": { color: "#202A44" }
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Checkbox
                    checked={user.l3}
                    onChange={() => handleCheckboxChange(user.id, "l3")}
                    size="small"
                    sx={{
                      color: "#202A44",
                      "&.Mui-checked": { color: "#202A44" }
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton   onClick={() => {
                        setDeleteId(user.id);
                        setAlertOpen(true);
                      }}>
                    <img
                      src={Delete}
                      alt="delete"
                      style={{
                        width: "14px",
                        height: "18px",
                        cursor: "pointer"
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
    padding: "5px 0",
    borderTop: "1px solid #e0e0e0",
    zIndex: 5,
    borderBottomLeftRadius:"10px",
    borderBottomRightRadius:"10px",
    boxShadow: "0 -2px 6px rgba(0,0,0,0.05)"
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
  );
}