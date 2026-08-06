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

  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);


  const currentTable =
    tableConfig[tableType || "scrap-source"];


  const title = currentTable.title;

  const rows = currentTable.rows;



  // Dynamic column alignment
  const getAlignment = (column: string) => {

    if(column === "Actions"){
      return "center";
    }

    return currentTable.alignments?.[column] || "left";

  };



  // Dynamic row height
  const getRowHeight = () => {

    return currentTable.rowHeight || 48;

  };



  return (

    <Box sx={{display:"flex"}}>


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
                 onClick={()=>navigate(-1)}
              >

                <IconButton
                  size="small"
                 
                  sx={{
                    color:"#000",
                    p:0,
                  }}
                >
                  <ChevronLeftIcon
                    sx={{
                      fontSize:"30px"
                    }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    fontSize:"16px",
                    fontWeight:500,
                  }}
                >
                  {title}
                </Typography>
              </Box>
             <Box
                sx={{
                  width:"220px"
                }}
              >
               <SearchField />
              </Box>
            </Box>
            <TableContainer
              sx={{
                border:"1px solid #f5f5f5"
              }}
            >


              <Table

                size="small"

                sx={{

                  "& .MuiTableCell-root":{
                    padding:"8px",
                    fontSize:"12px",

                    verticalAlign:"middle",

                  },


                  "& .MuiTableBody-root .MuiTableRow-root":{

                    height:getRowHeight(),

                  },


                  "& .MuiTableHead-root .MuiTableCell-root":{

                    background:"#F5F7FA",

                    fontWeight:500,

                  }

                }}

              >




                {/* HEADER */}

                <TableHead>

                  <TableRow>


                    {
                      currentTable.columns.map((column)=>(


                        <TableCell

                          key={column}

                          align={getAlignment(column)}

                        >

                          {column}


                        </TableCell>


                      ))
                    }


                  </TableRow>


                </TableHead>






                {/* BODY */}


                <TableBody>


                {
                  rows.map((row,index)=>(

                    <React.Fragment key={index}>


                    <TableRow>


                    {
                      currentTable.columns.map((column)=>{


                        // ACTION COLUMN

                        if(column==="Actions"){

                          return(

                            <TableCell

                              key={column}

                              align="center"

                            >

                              {
                                currentTable.expandable &&

                                <IconButton

                                  size="small"

                                  onClick={()=>setExpandedRow(
                                    expandedRow===index
                                    ? null
                                    : index
                                  )}

                                >

                                  {
                                    expandedRow===index

                                    ?

                                    <KeyboardArrowUpIcon/>

                                    :

                                    <KeyboardArrowDownIcon/>

                                  }


                                </IconButton>
                              }


                            </TableCell>

                          )

                        }





                        const key =
                          column
                          .replaceAll(" ","")
                          .charAt(0)
                          .toLowerCase()

                          +

                          column
                          .replaceAll(" ","")
                          .slice(1);






                        // STATUS CHIP


                        if(key==="status"){


                          return(

                            <TableCell

                              key={column}

                              align={getAlignment(column)}

                            >


                              <Chip

                                label={row[key]}

                                size="small"

                                sx={{

                                  height:26,

                                  fontSize:"12px",

                                  borderRadius:"8px",

                                  fontWeight:500,


                                  backgroundColor:

                                  row[key]==="Active"

                                  ?

                                  "#E1F8E0"

                                  :

                                  "#FEE2E2",
                                  color:
                                  row[key]==="Active"
                                  ?
                                  "#258c20"
                                  :
                                  "#DC2626"
                                }}
                              />
                            </TableCell>
                          )

                        }
                        return(
                          <TableCell
                            key={column}
                            align={getAlignment(column)}
                          >
                            {row[key]}
                          </TableCell>
                        )
                      })
                    }
                    </TableRow>
                    {/* EXPANDED ROW */}
                    {
                      currentTable.expandable &&
                      expandedRow===index &&
                      (
                        <TableRow>
                          <TableCell
                            colSpan={
                              currentTable.columns.length
                            }
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
                            </Box>
                          </TableCell>
                        </TableRow>
                      )

                    }
                    </React.Fragment>
                  ))
                }
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display:"flex",
                justifyContent:"center",
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
  )
};

export default CommonTable;