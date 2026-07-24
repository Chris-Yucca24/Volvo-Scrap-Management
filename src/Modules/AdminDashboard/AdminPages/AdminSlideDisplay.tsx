import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AppButton from "../../../Common/Components/UI/ButtonUI";
import Delete from "../../../assets/image-assets/bin_delete.png";
import displayBusImage from "../../../assets/image-assets/slidediplayimage1.png";
import displaydot from "../../../assets/image-assets/displayimage_page_dots.png";

import AlertModal from "../../../Common/Components/UI/AlertModal";
import Switch from "@mui/material/Switch";

type DisplayDataInfo = {
  order: string;
  Images: string;
  Imagetitle: string;
  emptyField: string;
  statusToggle: any;
};

const slideDisplayColumns = [
  { field: "emptyField", header: "" },
  { field: "order", header: "order" },
  { field: "Images", header: "Images" },
  { field: "Imagetitle", header: "Image title" },
  { field: "status", header: "Status" },
  { field: "Action", header: "Action" },
];

const generateUsers = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    order: (i + 1).toString().padStart(2, "0"),
    Images: displayBusImage,
    Imagetitle: `Image ${i + 1}.png`,
    emptyField: displaydot,
    statusToggle: true,
  }));

const stickyTopRow = {
  position: "sticky",
  top: 0,
  backgroundColor: "#F1F5FC",
  zIndex: 3,
  fontWeight: 500,
  padding: "8px 12px", // reduce height
  height: "32px",
};

const AdminSlideDisplay = () => {
  const [users, setUsers] = useState<DisplayDataInfo[]>(generateUsers(20));
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  // pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.order !== id));
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      handleDelete(deleteId);
    }
    setAlertOpen(false);
    setDeleteId(null);
  };

  useEffect(() => {
    setPage(1);
  }, [users]);
  return (
    <>
      <Box 
        sx={{
          backgroundColor: "#fff",
          padding: "10px 20px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="User-task" id="slide-display">
          <div className="left-user-main">
            <div className="filter-title">
              <div
                style={{ display: "flex", gap: "10px"}}
              >
                AdminSlideDisplay
              </div>
            </div>
          </div>

          <div className="right-btns-container">
            <AppButton variant="filled" className="add-new-kspcb">
              + Add New Images
            </AppButton>
          </div>
        </div>
        <Paper
          sx={{
            mt: 1,
            height: {
              xs: "60vh",
              sm: "65vh",
              md: "70vh",
              lg: "70vh",
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
                {slideDisplayColumns.map((col: any) => (
                  <TableCell key={col.field} sx={stickyTopRow}>
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((row) => (
                <TableRow key={row.order}>
                  {slideDisplayColumns.map((col) => (
                    <TableCell key={col.field}>
                      {col.field === "Images" ? (
                        <img src={row.Images} alt="img" width="130" />
                      ) : col.field === "status" ? (
                        <div>
                          <Switch color="success" defaultChecked />
                        </div>
                      ) : col.field === "emptyField" ? (
                        <img src={row.emptyField} alt="img" width="10" />
                      ) : col.field === "status" ? (
                        <div>
                          <Switch color="success" defaultChecked />
                        </div>
                      ) : col.field === "Action" ? (
                        <div>
                          <IconButton
                            onClick={() => {
                              setDeleteId(row.order);
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
                        row[col.field as keyof DisplayDataInfo]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

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
    </>
  );
};

export default AdminSlideDisplay;
