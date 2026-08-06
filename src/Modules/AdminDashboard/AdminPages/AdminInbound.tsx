import {
  BarChart,
  LineChart,
  PieChart
} from "@mui/x-charts";

import {
  Box,
  Typography,
  Paper,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import TotalScrap from "../../../assets/image-assets/Total_scrap.svg"
import InVentory from "../../../assets/image-assets/INHand.svg"
import Disposable_schedule from "../../../assets/image-assets/Disposed.svg"
import Disposable_Completed from "../../../assets/image-assets/Complete-disposal.svg"
import hazordous from "../../../assets/image-assets/Hazardous-icon.svg"


const summaryCards = [
  {
    title: "Total Scrap Received",
    value: "125.60 T",
    icon: TotalScrap
  },
  {
    title: "Inventory on hand",
    value: "2310.650 T",
    icon: InVentory

  },
  {
    title: "Disposal scheduled",
    value: "85.230 T",
    icon: Disposable_schedule
  },
  {
    title: "Disposal Completed",
    value: "68.400 T",
    icon: Disposable_Completed
  },
  {
    title: "Hazardous Scrap",
    value: "18.300 T",
    icon: hazordous
  }
]

const inboundData = [
  {
    scrapCode: "SCRAP-AL-001",
    category: "Aluminum Cut Sheet",
    entries: 3,
    total: "7.450",
    approved: "5000",
    pending: "2.450"
  },
  {
    scrapCode: "SCRAP-AL-002",
    category: "Copper Scrap",
    entries: 4,
    total: "26.540",
    approved: "15.600",
    pending: "10.850"
  },
  {
    scrapCode: "SCRAP-AL-002",
    category: "Copper Scrap",
    entries: 4,
    total: "26.540",
    approved: "15.600",
    pending: "10.850"
  },
  {
    scrapCode: "SCRAP-AL-002",
    category: "Copper Scrap",
    entries: 4,
    total: "26.540",
    approved: "15.600",
    pending: "10.850"
  }
];

const inventoryAgingData = [
  {
    bucket: "0-30 Days",
    metalScrap: "12.5 ",
    rubber: "4.2 ",
    glass: "2.8 ",
    batteryWaste: "1.5 ",
    hazardous: "0.8 ",
    nonHazardous: "6.4 ",
    total: "28.2 "
  },
  {
    bucket: "31-60 Days",
    metalScrap: "8.5 ",
    rubber: "3.1 ",
    glass: "1.9 ",
    batteryWaste: "0.9 ",
    hazardous: "1.2 ",
    nonHazardous: "4.8 ",
    total: "20.4"
  },
  {
    bucket: "60+ Days",
    metalScrap: "5.2 ",
    rubber: "1.8 ",
    glass: "1.2 ",
    batteryWaste: "0.5 ",
    hazardous: "0.7 ",
    nonHazardous: "3.6 ",
    total: "13.0 "
  }
];

export default function AdminInbound() {
const navigate = useNavigate();
  return (

    <Box className="dashboard-container">


      {/* Title */}

      <Box className="dashboard-header">

        <Typography variant="h6">
          Inbound Overview
        </Typography>

        <Typography sx={{
          fontSize:"12px"
        }}>
          ↻ Last Updated : 28 June 2026 10:38 pm
        </Typography>

      </Box>



      {/* Cards */}

      <Box className="summary-grid">

        {
          summaryCards.map((card) => (
            <Paper className="summary-card"
            sx={{
              borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
            }}>

              <Box
                className="icon-box"
                sx={{
                  background: card.color,
                  
                }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                />
              </Box>

              <Box>

                <Typography sx={{
                  fontSize: "14px",
                  fontWeight: 500
                }}>
                  {card.title}
                </Typography>

                <Typography fontWeight={500}>
                  {card.value}
                </Typography>

              </Box>


            </Paper>
          ))
        }

      </Box>




      {/* Charts */}

      <Box className="chart-grid" >


        <Paper className="chart-card" sx={{
          height: "280px",
          borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
        }}>
          <Box sx={{
            display:"flex",
            justifyContent:"space-between"
          }}>
          <Typography sx={{
            fontWeight: 500,
            fontSize: "14px"
          }}>
            Scrap by Source Location (T)
          </Typography>

          <Typography sx={{
             fontWeight: 500,
            fontSize: "14px",
            cursor:"pointer"
          }}
            onClick={() => navigate("/view-all/scrap-source")}>
            View all
          </Typography>
          </Box>


          <BarChart
           yAxis={[
    {
      width: 30, 
    },
  ]}
  margin={{
    left: 0,
    right: 10,
    top: 20,
    bottom: 30,
  }}
  xAxis={[
    {
      scaleType: "band",
      data: [
        "Plant 1",
        "Plant 2",
        "Plant 3",
        "Plant 4",
        "Plant 5",
        "Plant 6",
        "Plant 7",
      ],
      categoryGapRatio: 0.5,
    },
  ]}
  series={[
    
    {
      data: [48, 50, 38, 30, 22, 20, 5],
      color: "#003A70",
      barLabel: (item) => `${item.value}`,
      barLabelPlacement: "outside",
    },
    
  ]}
  height={270}
  slotProps={{
    bar: {
      rx: 8,
      ry: 8,
    },
    barLabel: {
      style: {
        fill: "#374151",
        fontSize: 12,
        fontWeight: 500,
      },
    },
  }}
  sx={{
    "& .MuiChartsAxis-tickLabel": {
      fill: "#6B7280", // X & Y axis label colour
      fontSize: 12,
    },
    "& .MuiChartsAxis-line": {
      stroke: "#D1D5DB",
    },
    "& .MuiChartsAxis-tick": {
      stroke: "#D1D5DB",
    },
  }}
/>

        </Paper>
        <Paper className="chart-card" sx={{
          height: "280px",
          borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
        }}>

           <Box sx={{
            display:"flex",
            justifyContent:"space-between"
          }}>
          <Typography sx={{
            fontWeight: 500,
            fontSize: "14px"
          }}>
           Scrap by Material Type (T)
          </Typography>

          {/* <Typography sx={{
             fontWeight: 500,
            fontSize: "14px",
            cursor:"pointer"
          }}
            onClick={() => navigate("/view-all/scrap-source")}>
            View all
          </Typography> */}
          </Box>



         <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  }}
>
  {/* Pie Chart */}
  <PieChart
    slots={{
      legend: () => null,
    }}
    margin={{ top: 10, bottom: 10, left: 0, right: 0 }}
    series={[
      {
        data: [
          { id: 0, value: 52.4, label: "Metal Scrap", color: "#124682" },
          { id: 1, value: 28.1, label: "Rubber", color: "#28A745" },
          { id: 2, value: 22.3, label: "Glass", color: "#F4B400" },
          { id: 3, value: 9.9, label: "Battery Waste", color: "#D32F2F" },
          { id: 4, value: 22.3, label: "Hazardous", color: "#df5482" },
        ],
        innerRadius: 55,
        outerRadius: 95,
        cornerRadius: 3,
      },
    ]}
    height={230}
    width={230}
  />


  {/* Custom Legend */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 1.5,
      flex: 1,
      ml: 2,
    }}
  >
    {[
      { label: "Metal Scrap", value: 52.4, color: "#124682" },
      { label: "Rubber", value: 28.1, color: "#28A745" },
      { label: "Glass", value: 22.3, color: "#F4B400" },
      { label: "Battery Waste", value: 9.9, color: "#D32F2F" },
      { label: "Hazardous", value: 22.3, color: "#df5482" },
    ].map((item) => (
      <Box
        key={item.label}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: item.color,
            flexShrink: 0,
          }}
        />

        <Box>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {item.label}
          </Typography>

          <Typography
            sx={{
              
               fontSize: "11px",
              color: "#6B7280",
              lineHeight: 2,
            }}
          >
            {item.value} T
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
</Box>
        </Paper>





       <Paper
  className="chart-card"
  sx={{
    height: "280px",
    borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
    
  }}
>
  {/* Header + Custom Legend */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 1,
    }}
  >
    <Typography
      sx={{
        fontWeight: 500,
        fontSize: "14px",
      }}
    >
      Scrap Generation Trend (T)
    </Typography>

    {/* Custom Legend */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Current */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >
        <Box
          sx={{
            width: 14,
            height: 3,
            borderRadius: 2,
            bgcolor:"#003A70",
          }}
        />

        <Typography
          sx={{
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          Current
        </Typography>
      </Box>


      {/* Previous */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >
        <Box
          sx={{
            width: 14,
            height: 3,
            borderRadius: 2,
            bgcolor: "#9CA3AF",
          }}
        />

        <Typography
          sx={{
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          Previous
        </Typography>
      </Box>

    </Box>
  </Box>


  {/* Chart */}
  <LineChart
   yAxis={[
    {
      width: 30, // or even 15
    },
  ]}
 slots={{
    legend: () => null,
  }}
    xAxis={[
      {
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
        ],
      },
    ]}

    series={[
      {
        data: [
          10,
          22,
          27,
          21,
          26,
          13,
          22,
          18,
          23,
          21,
          7,
          22,
          19,
        ],
        label: "Current",
        color: "#003A70",
      },
      {
        data: [
          10,
          19,
          15,
          24,
          18,
          20,
          6,
          14,
          11,
          12,
          8,
          12,
          15,
        ],
        label: "Previous",
        color: "#9CA3AF",
      },
    ]}

    height={260}

    

    margin={{
      left: 0,
      right: 10,
      top: 10,
      bottom: 25,
    }}

    sx={{
      "& .MuiChartsAxis-tickLabel": {
        fill: "#6B7280",
        fontSize: 12,
      },

      "& .MuiChartsAxis-line": {
        stroke: "#E5E7EB",
      },

      "& .MuiChartsAxis-tick": {
        stroke: "#E5E7EB",
      },

      "& .MuiChartsGrid-line": {
        stroke: "#F3F4F6",
      },
    }}

  />

</Paper>
      </Box>
      {/* Inbound Entries */}

      <Paper className="table-card"
      sx={{
        borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
      }}>

        <Box className="table-header">

          <Typography fontWeight={500}>
            Inbound Entries
          </Typography>

          <Typography
  className="view-link"
  onClick={() => navigate("/view-all/inbound-entry")}
  sx={{
    cursor:"pointer"
  }}
>
  View All Entries
</Typography>

        </Box>


        <TableContainer>

          <Table
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                padding: "14px 12px",
                fontSize: "12px",
              },
              "& .MuiTableHead-root .MuiTableCell-root": {
                fontSize: "12px",
                fontWeight: 400,
                padding: "8px 12px",
              },
            }}
          >

            <TableHead>

              <TableRow sx={{
                height: 36,
              }}>
                <TableCell>Scrap Code</TableCell>
                <TableCell>Waste Category</TableCell>
                <TableCell align="center">
                  No.of Entries
                </TableCell>
                <TableCell align="center">
                  Total Weight(T)
                </TableCell>
                <TableCell align="center">
                  Approved Weight(T)
                </TableCell>
                <TableCell align="center">
                  Pending Weight(T)
                </TableCell>
              </TableRow>

            </TableHead>


            <TableBody>

              {
                inboundData.map((row, index) => (
                  <TableRow key={index} sx={{
                    fontSize: "12px"
                  }}>

                    <TableCell>
                      {row.scrapCode}
                    </TableCell>

                    <TableCell>
                      {row.category}
                    </TableCell>

                    <TableCell align="center">
                      {row.entries}
                    </TableCell>

                    <TableCell align="center">
                      {row.total}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: "#20B978"
                      }}
                    >
                      {row.approved}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: "#E59B00"
                      }}
                    >
                      {row.pending}
                    </TableCell>


                  </TableRow>
                ))
              }

            </TableBody>


          </Table>

        </TableContainer>

      </Paper>

      {/* Inventory Aging Summary */}

      <Paper className="table-card" sx={{
        borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
      }}>

        <Box className="table-header">

          <Typography fontWeight={500}>
            Inventory Aging Summary
          </Typography>

          {/* <Typography className="view-link">
            View All Entries
          </Typography> */}

        </Box>


        <TableContainer>

          <Table size="small"
            sx={{
              "& .MuiTableCell-root": {
                padding: "14px 12px",
                fontSize: "12px",
              },
              "& .MuiTableHead-root .MuiTableCell-root": {
                fontSize: "12px",
                fontWeight: 400,
                padding: "8px 12px",
              },
            }}
          >

            <TableHead>

              <TableRow>
                <TableCell>Aging Bucket</TableCell>
                <TableCell align="center">Metal Scrap</TableCell>
                <TableCell align="center">Rubber</TableCell>
                <TableCell align="center">Glass</TableCell>
                <TableCell align="center">Battery Waste</TableCell>
                <TableCell align="center">Hazardous</TableCell>
                <TableCell align="center">Non-Hazardous</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>

            </TableHead>


            <TableBody>

              {
                inventoryAgingData.map((row, index) => (
                  <TableRow key={index}>

                    <TableCell>
                      {row.bucket}
                    </TableCell>

                    <TableCell align="center">
                      {row.metalScrap}
                    </TableCell>

                    <TableCell align="center">
                      {row.rubber}
                    </TableCell>

                    <TableCell align="center">
                      {row.glass}
                    </TableCell>

                    <TableCell align="center">
                      {row.batteryWaste}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: "#E74C3C"
                      }}
                    >
                      {row.hazardous}
                    </TableCell>

                    <TableCell align="center">
                      {row.nonHazardous}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 500
                      }}
                    >
                      {row.total}
                    </TableCell>

                  </TableRow>
                ))
              }

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>


    </Box>

  )

}