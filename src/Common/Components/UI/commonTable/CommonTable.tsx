import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Pagination,
} from "@mui/material";


import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


import Navbar from "../../../DashboardComponents/NavBar";
import Sidebar from "../../../DashboardComponents/Sidebar";
import SearchField from "../../../DashboardComponents/searchField";
import { tableConfig } from "./tableConfig";


const CommonTable = () => {

  const { tableType } = useParams();

  const navigate = useNavigate();

  const [expandedRow, setExpandedRow] = React.useState<string | null>(null);


const currentTable = tableConfig[tableType || "scrap-source"];

const title = currentTable.title;

const rows = currentTable.rows;
  



  return (

    <Box sx={{ display:"flex" }}>


      <Sidebar />


      <Box
        sx={{
          flex:1,
          background:"#F5F7FA",
          minHeight:"100vh",
        }}
      >
        <Navbar />
        <Box
          sx={{
            p:3,
            mt:"64px",
          }}
        >
          <Paper
            sx={{
              borderRadius:"10px",
              border:"1px solid #E5E7EB",
              boxShadow:"0px 2px 10px rgba(0,43,92,0.08)",
              overflow:"hidden",
              p:2,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                mb:2,
              }}
            >
              <Box
                sx={{
                  display:"flex",
                  alignItems:"center",
                  gap:0.5,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => navigate(-1)}
                  sx={{
                    color:"#000",
                    p:0,
                  }}
                >
                  <ChevronLeftIcon
                    sx={{
                      fontSize:"30px",
                    }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    fontSize:"16px",
                    fontWeight:500,
                    color:"#000",
                  }}
                >
                  {title}
                </Typography>
              </Box>
              <Box
                sx={{
                  width:"220px",
                }}
              >
                <SearchField />
              </Box>
            </Box>
            <TableContainer sx={{
                border:"1px solid #f5f5f5"
            }}>
              <Table
                size="small"
                sx={{
                  "& .MuiTableCell-root":{
                    padding:"8px 12px",
                    fontSize:"12px",
                    
                  },
                }}
              >
                <TableHead>
  <TableRow
    sx={{
      background:"#F5F7FA",
    }}
  >

    {currentTable.columns.map((column)=>(
      <TableCell
        key={column}
        align={column === "Actions" ? "center" : "left"}
        sx={{
          fontWeight:500
        }}
      >
        {column}
      </TableCell>
    ))}

  </TableRow>
</TableHead>
                <TableBody>
  {rows.map((row, index) => (
    <React.Fragment key={index}>

      {/* Main Row */}
      <TableRow>

        {currentTable.columns.map((column) => {

          // Actions column
          if (column === "Actions") {
            return (
              <TableCell
                key={column}
                align="center"
              >

                {currentTable.expandable && (
                  <IconButton
                    size="small"
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === index
                          ? null
                          : index
                      )
                    }
                  >

                    {expandedRow === index ? (
                      <KeyboardArrowUpIcon fontSize="medium" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="medium" />
                    )}

                  </IconButton>
                )}

              </TableCell>
            );
          }


          // Convert column name into object key
          const key =
            column
              .replaceAll(" ", "")
              .charAt(0)
              .toLowerCase() +
            column
              .replaceAll(" ", "")
              .slice(1);



          // Status chip handling
          if (key === "status") {

            return (
              <TableCell
                key={column}
                align="left"
              >

                <Chip
                  label={row[key]}
                  size="small"
                  sx={{
                    height:26,
                    fontSize:"12px",
                    fontWeight:500,
                    borderRadius:"8px",
                    padding:"10px",

                    backgroundColor:
                      row[key] === "Active"
                      ? "#E1F8E0"
                      : "#FEE2E2",

                    color:
                      row[key] === "Active"
                      ? "#258c20"
                      : "#DC2626",
                  }}
                />

              </TableCell>
            );
          }



          return (
            <TableCell
              key={column}
            >
              {row[key]}
            </TableCell>
          );


        })}

      </TableRow>



      {/* Expanded Row */}

      {
        currentTable.expandable &&
        expandedRow === index && (

          <TableRow>

            <TableCell
              colSpan={currentTable.columns.length}
            >

              <Box
                sx={{
                  background:"#F8FAFC",
                  border:"1px solid #E5E7EB",
                  borderRadius:"6px",
                  p:2,
                }}
              >

                <Typography
                  sx={{
                    fontSize:"13px",
                    fontWeight:500,
                  }}
                >
                  Details - {row.sourceName}
                </Typography>


                {/* Nested table will come here */}


              </Box>

            </TableCell>

          </TableRow>

        )
      }


    </React.Fragment>
  ))}
</TableBody>
              </Table>
            </TableContainer>
           <Box
              sx={{
                display:"flex",
                justifyContent:"flex-end",
                p:2,
              }}
            >
              <Pagination
                count={5}
                color="primary"
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonTable;