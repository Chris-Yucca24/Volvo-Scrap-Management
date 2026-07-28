import { Gauge, LineChart, PieChart } from "@mui/x-charts";

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
  LinearProgress,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import OutTotalScrap from "../../../assets/image-assets/outbound_total_scrap.png";
import ReadyToDispose from "../../../assets/image-assets/total_diposal.png";
import PendingApproval from "../../../assets/image-assets/pending_approval.png";
import ScheduledDispatch from "../../../assets/image-assets/schedule_dispatch.png";
import CompletedDispatch from "../../../assets/image-assets/complete_dispatch.png";
import GateExit from "../../../assets/image-assets/gate_exits.png";
import Eyeicon from "../../../assets/image-assets/outbound_action_eyeicon.png";
import DownloadIcon from "../../../assets/image-assets/download_icon.png";
import { Style } from "@mui/icons-material";

const summaryCards = [
  {
    title: "Total Scrap (T)",
    value: "3,245.680",
    icon: OutTotalScrap,
   color: "linear-gradient(180deg, #2874EE 0%, #003DA1 100%)",
  },
  {
    title: "Total Ready to Disposal (T)",
    value: "1,842.430",
    icon: ReadyToDispose,
    color: " linear-gradient(180deg, #47CA7C 0%, #0A6830 100%)",
  },
  {
    title: "Pending Approvals",
    value: "18",
    icon: PendingApproval,
    color: " linear-gradient(180deg, #EBD397 0%, #E6B526 100%)",
  },
  {
    title: "Scheduled Dispatches",
    value: "12",
    icon: ScheduledDispatch,
    color: "linear-gradient(180deg, #986AE3 0%, #5B19C4 100%)",
  },
  {
    title: "Completed Dispatch",
    value: "96",
    icon: CompletedDispatch,
    color: " linear-gradient(180deg, #47CA7C 0%, #0A6830 100%)",
  },
  {
    title: "Gate Exits Today",
    value: "20",
    icon: GateExit,
    color: "linear-gradient(180deg, #56D4E0 0%, #2FA4AF 100%)",
  },
];

const agingData = [
  {
    bucket: "0 - 30 Days",
    totalWeight: "4.250",
    percent: "4.8%",
    color: "#22C55E",
  },
  {
    bucket: "31 - 60 Days",
    totalWeight: "6.120",
    percent: "6.9%",
    color: "#3B82F6",
  },
  {
    bucket: "61 - 90 Days",
    totalWeight: "5.430",
    percent: "6.1%",
    color: "#F59E0B",
  },
  {
    bucket: "90 Days",
    totalWeight: "7.600",
    percent: "8.7%",
    color: "#EF4444",
  },
];

const disposalEntries = [
  {
    code: "DISP-2026-0431",
    scrapCode: "SCRAP-AL-001",
    description: "Hazardous Waste",
    vendor: "GreenTech Recovery",
    location: "Plant 1 - Zone A",
    scheduled: "19-Jun-2026",
    dispatched: "19-Jun-2026 10:21 am",
    weight: "120",
    status: "Completed",
    gateExit: "19-Jun-2026 11:30 am",
    challan: "CH-778211",
  },
  {
    code: "DISP-2026-0432",
    scrapCode: "SCRAP-AL-002",
    description: "Plastic Scrap",
    vendor: "Blue Sky Recycling",
    location: "Plant 1 - Zone A",
    scheduled: "19-Jun-2026",
    dispatched: "--",
    weight: "120",
    status: "In Transit",
    gateExit: "--",
    challan: "--",
  },
  {
    code: "DISP-2026-0433",
    scrapCode: "SCRAP-AL-003",
    description: "Metal Scrap",
    vendor: "SafeMax Waste",
    location: "Plant 1 - Zone A",
    scheduled: "19-Jun-2026",
    dispatched: "--",
    weight: "120",
    status: "Pending",
    gateExit: "--",
    challan: "--",
  },
];

const statusStyles: any = {
  Completed: { backgroundColor: "#E1F8E0", color: "#258C20" },
  Pending: { backgroundColor: "#FAEFDC", color: "#FDA921" },
  "In Transit": { backgroundColor: "#CDDEF3", color: "#317ADA" },
};
const vendors = [
  { name: "Shree Metal Vender", value: 78 },
  { name: "Green Recycle Pvt. Ltd", value: 59 },
  { name: "Eco Waste Solutions", value: 26 },
  { name: "Metal Corp India", value: 48 },
  { name: "Recycle India Pvt. Ltd", value: 81 },
  { name: "Scrap Ring Pvt. Ltd", value: 66 },
];
const approvalData = [
  { level: "L1 Approver", pending: "4.250", items: 6 },
  { level: "L2 Approver", pending: "4.430", items: 8 },
  { level: "L3 Approver", pending: "3.620", items: 5 },
  { level: "L4 Approver", pending: "2.850", items: 4 },
  { level: "L5 Approver", pending: "2.470", items: 3 },
];

export default function AdminOutbound() {
  return (
    <Box className="dashboard-container">
      {/* Header */}

      <Box className="dashboard-header">
        <Typography variant="h6">Outbound Overview</Typography>

        <Typography sx={{
          fontSize:"12px"
        }}>↻ Last Updated : 28 June 2026 10:38 pm</Typography>
      </Box>

      {/* Summary Cards */}

      <Box className="summary-grid outbound-summary-grid">
        {summaryCards.map((card) => (
          <Paper key={card.title} className="summary-card"
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
              <img src={card.icon} alt={card.title} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                {card.value}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Charts Section */}

      <Box className="outbound-chart-grid">
        {/* Disposal Readiness */}

        <Paper className="chart-card"
        sx={{
          borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
        }}>
          <Typography fontWeight={500}>Disposal Readiness</Typography>

         <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent:"space-between",
    mt: 1,
  }}
>
  {/* Gauge Wrapper */}
  <Box
    sx={{
      position: "relative",
      width: 280,
      height: 200,
    }}
  >
    <Gauge
      value={82}
      startAngle={-90}
      endAngle={90}
      width={280}
      height={180}
      innerRadius="72%"
      outerRadius="100%"
      sx={{
        "& .MuiGauge-valueArc": {
          fill: "#2AAD43",
        },
        "& .MuiGauge-referenceArc": {
          fill: "#E4B66D",
        },
        "& .MuiGauge-valueText": {
          display: "none",
        },
      }}
    />

    {/* Gauge Center Text */}
    <Box
      sx={{
        position: "absolute",
        top: "78%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#1F2937",
          lineHeight: 1,
        }}
      >
        82%
      </Typography>

      <Typography
        sx={{
          fontSize: "13px",
          color: "#6B7280",
          mt: 0.5,
        }}
      >
        Ready
      </Typography>
    </Box>
  </Box>

  <svg width="0" height="0"></svg>

  {/* Legend */}
  <Box sx={{ ml: 2 }}>
    <Box display="flex" gap={1} alignItems="center">
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#22C55E",
        }}
      />

      <Typography fontSize={12} sx={{
        fontWeight:500
      }}>Ready</Typography>
    </Box>

    <Typography fontSize={11}>
      82% (70.20 T)
    </Typography>

    <Box display="flex" gap={1} alignItems="center" mt={2}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#F59E0B",
        }}
      />

      <Typography fontSize={12}  sx={{
        fontWeight:500
      }}>Pending</Typography>
    </Box>

    <Typography fontSize={11}>
      18% (15.21 T)
    </Typography>
  </Box>
</Box>
        </Paper>

        {/* Aging Scrap Summary */}

       <Paper
  className="chart-card"
  sx={{
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)",
   
  }}
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    sx={{ mb: 1.5 }}
  >
    <Typography fontWeight={500} fontSize={14}>
      Aging Scrap Summary
    </Typography>

    <Typography
      fontSize={12}
      color="primary"
      sx={{ cursor: "pointer" }}
    >
      View Full Report
    </Typography>
  </Box>


  <TableContainer
    sx={{
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      overflow: "hidden",
    }}
  >
    <Table size="small">

      <TableHead>
        <TableRow
          sx={{
            background: "#F8FAFC",
          }}
        >
          <TableCell
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#000",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            Aging Bucket
          </TableCell>

          <TableCell
            align="center"
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#000",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            Total Weight
          </TableCell>

          <TableCell
            align="center"
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#000",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            % of Total
          </TableCell>
        </TableRow>
      </TableHead>


      <TableBody>

        {agingData.map((item) => (
          <TableRow
            key={item.bucket}
            sx={{
              "&:last-child td": {
                borderBottom: 0,
              },
            }}
          >

            <TableCell
              sx={{
                fontSize: 12,
                color: "#374151",
              }}
            >
              <Box
                display="flex"
                gap={1}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: item.color,
                  }}
                />

                {item.bucket}
              </Box>
            </TableCell>


            <TableCell
              align="center"
              sx={{
                fontSize: 12,
                color: "#374151",
              }}
            >
              {item.totalWeight}
            </TableCell>


            <TableCell
              align="center"
              sx={{
                fontSize: 12,
                color: "#374151",
              }}
            >
              {item.percent}
            </TableCell>

          </TableRow>
        ))}


        {/* Total Row */}
        <TableRow
          sx={{
            background: "#F8FAFC",
          }}
        >

          <TableCell
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#1F2937",
            }}
          >
            Total
          </TableCell>

          <TableCell
            align="center"
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#1F2937",
            }}
          >
            23.450
          </TableCell>

          <TableCell
            align="center"
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: "#1F2937",
            }}
          >
            26.5%
          </TableCell>

        </TableRow>

      </TableBody>

    </Table>
  </TableContainer>
</Paper>
        {/* agling summary  */}

        <Paper
  className="chart-card"
  sx={{
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)",
    overflow: "hidden",
  }}
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    sx={{ mb: 0.5 }}
  >
    <Typography fontWeight={500} fontSize={14}>
      Threshold Monitoring
    </Typography>

    <IconButton size="small">
      ⚙
    </IconButton>
  </Box>


  <LineChart
    height={180}
    series={[
      {
        data: [20, 45, 60, 42, 58, 15, 68, 80],
        area: false,
        color: "#002B5C",
      },
    ]}
    xAxis={[
      {
        scaleType: "point",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        tickLabelStyle: {
          fontSize: 10,
        },
      },
    ]}
    yAxis={[
      {
        min: 0,
        max: 100,
        tickLabelStyle: {
          fontSize: 10,
        },
      },
    ]}
    grid={{
      horizontal: true,
    }}
    margin={{
      left:-10,
      right: 10,
      top: 10,
      bottom: 5,
    }}
  />
</Paper>
      </Box>
      {/* Inbound Entries */}

      <Paper className="table-card"  sx={{
          borderRadius:"10px",
              boxShadow: "0px 2px 10px rgba(0, 43, 92, 0.08)"
        }}>
        <Box className="table-header">
          <Typography fontWeight={500}>Inbound Entries</Typography>

          <Typography className="view-link">View All Entries</Typography>
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
              <TableRow
                sx={{
                  height: 36,
                }}
              >
                <TableCell>Disposal Code</TableCell>
                <TableCell>Scrap Code</TableCell>
                <TableCell align="center">Items Description</TableCell>
                <TableCell align="center">Vendor</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Scheduled Date</TableCell>
                <TableCell align="center">Dispatched Date</TableCell>
                <TableCell align="center">Net Weight (T) </TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Gate Exit</TableCell>
                <TableCell align="center">Challan</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {disposalEntries.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.scrapCode}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.vendor}</TableCell>
                  <TableCell align="center">{row.location}</TableCell>
                  <TableCell align="center">{row.scheduled}</TableCell>{" "}
                  <TableCell align="center">{row.dispatched}</TableCell>{" "}
                  <TableCell align="center">{row.weight}</TableCell>{" "}
                  <TableCell align="center">
                    <Chip
                      label={row.status}
                      sx={{
                        ...statusStyles[row.status],
                        fontWeight: "500",
                        borderRadius: "6px",
                      }}
                    />
                  </TableCell>{" "}
                  <TableCell align="center">{row.gateExit}</TableCell>
                  <TableCell align="center">{row.challan}</TableCell>
                  <TableCell className="outbound-actions" align="center" >
                    <img src={Eyeicon} alt=""  />{" "}
                    <img src={DownloadIcon} alt="" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Charts Section */}

      <Box className="outbound-chart-grid">
        {/* Disposal Readiness */}

        <Paper
  className="chart-card"
  sx={{
    height: "300px",
    borderRadius: "10px",
   
    boxShadow: "0px 2px 6px rgba(0,0,0,0.06)",
  }}
>
  <Typography fontWeight={500} mb={2}>
    Disposal Readiness
  </Typography>

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      mt: 1,
     borderRadius:"8px",
       border: "1px solid #E5E7EB",
       padding:2,
    }}
  >
    <PieChart
     height={250}
      width={260}
      margin={{ 
        top: 5, 
        bottom: 5, 
        left: -10, 
        right: 5 
      }}
      series={[
        {
          data: [
            { id: 0, value: 83.3, color: "#2AAD43" },
            { id: 1, value: 5.1, color: "#EA585C" },
            { id: 2, value: 15.4, color: "#DDA346" },
          ],
          innerRadius: 60,
          outerRadius: 115,
        },
      ]}
     
      sx={{
        "& path": {
          stroke: "none",
        },
      }}
    />

    <Box sx={{ ml: 1.5 }}>
      <Box display="flex" gap={1} alignItems="center">
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22C55E",
          }}
        />
        <Typography fontSize={12}>
          Uploaded
        </Typography>
      </Box>

      <Typography fontSize={11}>
        130 (83.3%)
      </Typography>


      <Box display="flex" gap={1} alignItems="center" mt={2}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#EA585C",
          }}
        />
        <Typography fontSize={12}>
          Failed
        </Typography>
      </Box>

      <Typography fontSize={11}>
        5 (5.1%)
      </Typography>


      <Box display="flex" gap={1} alignItems="center" mt={2}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#F59E0B",
          }}
        />
        <Typography fontSize={12}>
          Pending
        </Typography>
      </Box>

      <Typography fontSize={11}>
        24 (15.4%)
      </Typography>
    </Box>

  </Box>
</Paper>

        {/* pending approvals */}
        <Paper
          sx={{
            p: 2,
            borderRadius:"10px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography fontWeight={500}>
              Pending Approvals (18.620 T)
            </Typography>

            <Typography
              fontSize={12}
              color="primary"
              sx={{ cursor: "pointer", fontWeight:"500" }}
            >
              View All
            </Typography>
          </Box>

          {/* Table */}
          <TableContainer
  sx={{
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    overflow: "hidden",
  }}
>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#f1f3f6",
                   
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 , }}>
                    Approval Levels
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: 500 }}>
                    Pending(T)
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: 500 }}>
                    Items
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {approvalData.map((row) => (
                  <TableRow key={row.level}>
                    <TableCell style={{padding:"12px", fontSize:"12px"}}>{row.level}</TableCell>

                    <TableCell align="center" style={{fontSize:"12px"}}>{row.pending}</TableCell>

                    <TableCell align="center">{row.items}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/*  Vendor Performance */}

        <Box sx={{ p: 2, borderRadius: 2,boxShadow:"0px 2px 6px rgba(0,0,0,0.08)" , background:"#fff"}}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" mb={3} >
            <Typography fontWeight={500}>
            Vendor Performance (one time dispatch %)
            </Typography>

            <Typography
              fontSize={12}
              color="primary"
              sx={{ cursor: "pointer", fontWeight:500 }}
            >
              View All
            </Typography>
          </Box>

          {vendors.map((vendor, i) => (
            <Box key={i} display="flex" alignItems="center" gap={2} mb={2} padding={"2px"} >
              {/* Vendor Name */}
              <Typography sx={{ minWidth: 160, fontSize: 13 }}>
                {vendor.name}
              </Typography>

              {/* Progress Bar */}
              <LinearProgress
                variant="determinate"
                value={vendor.value}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 5,
                  
                  backgroundColor: "#dcdcdc",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#6c83d3",
                  },
                }}
              />

              {/* Percentage */}
              <Typography sx={{ minWidth: 40, fontSize: 13 }}>
                {vendor.value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
