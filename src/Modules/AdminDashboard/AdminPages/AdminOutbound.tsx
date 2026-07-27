import {
  Gauge,
  LineChart,
} from "@mui/x-charts";

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
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

// import TotalScrap from "../../../assets/image-assets/Total_scrap.svg";
// import ReadyToDispose from "../../../assets/image-assets/Inventory-new.svg";
// import PendingApproval from "../../../assets/image-assets/PendingApproval.svg";
// import ScheduledDispatch from "../../../assets/image-assets/ScheduledDispatch.svg";
// import CompletedDispatch from "../../../assets/image-assets/Disposablecompleted.svg";
// import GateExit from "../../../assets/image-assets/GateExit.svg";

const summaryCards = [
  {
    title: "Total Scrap (T)",
    value: "3,245.680",
    // icon: TotalScrap,
    color: "#2962FF",
  },
  {
    title: "Total Ready to Disposal (T)",
    value: "1,842.430",
    // icon: ReadyToDispose,
    color: "#24C35A",
  },
  {
    title: "Pending Approvals",
    value: "18",
    // icon: PendingApproval,
    color: "#F6C343",
  },
  {
    title: "Scheduled Dispatches",
    value: "12",
    // icon: ScheduledDispatch,
    color: "#7C3AED",
  },
  {
    title: "Completed Dispatch",
    value: "96",
    // icon: CompletedDispatch,
    color: "#23B44D",
  },
  {
    title: "Gate Exits Today",
    value: "20",
    // icon: GateExit,
    color: "#2DB6E8",
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


export default function AdminOutbound() {

  return (

    <Box className="dashboard-container">

      {/* Header */}

      <Box className="dashboard-header">

        <Typography variant="h6">
          Outbound Overview
        </Typography>

        <Typography>
          ↻ Last Updated : 28 June 2026 10:38 pm
        </Typography>

      </Box>

      {/* Summary Cards */}

      <Box className="summary-grid outbound-summary-grid">

        {summaryCards.map((card) => (

          <Paper
            key={card.title}
            className="summary-card"
          >

            <Box
              className="icon-box"
              sx={{
                background: card.color,
              }}
            >

              <img
                // src={card.icon}
                alt={card.title}
              />

            </Box>

            <Box>

              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
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

  <Paper className="chart-card">

    <Typography fontWeight={600}>
      Disposal Readiness
    </Typography>


    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 1
      }}
    >

      <Gauge
        value={82}
        startAngle={-90}
        endAngle={90}
        width={220}
        height={140}
        innerRadius="70%"
        outerRadius="100%"
        sx={{
          "& .MuiGauge-valueText": {
            fontSize: "22px",
            fontWeight: 700,
          },
        }}
      />


      <Box sx={{ ml: 2 }}>

        <Box display="flex" gap={1} alignItems="center">
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22C55E"
            }}
          />

          <Typography fontSize={12}>
            Ready
          </Typography>

        </Box>


        <Typography fontSize={11}>
          82% (70.20 T)
        </Typography>



        <Box 
          display="flex" 
          gap={1} 
          alignItems="center"
          mt={2}
        >

          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#F59E0B"
            }}
          />

          <Typography fontSize={12}>
            Pending
          </Typography>

        </Box>


        <Typography fontSize={11}>
          18% (15.21 T)
        </Typography>


      </Box>

    </Box>

  </Paper>



  {/* Aging Scrap Summary */}

  <Paper className="chart-card">

    <Box
      display="flex"
      justifyContent="space-between"
    >

      <Typography fontWeight={600}>
        Aging Scrap Summary
      </Typography>


      <Typography
        fontSize={12}
        color="primary"
      >
        View Full Report
      </Typography>

    </Box>



    <TableContainer>

      <Table size="small">

        <TableHead>

          <TableRow>

            <TableCell>
              Aging bucket
            </TableCell>

            <TableCell align="right">
              Total Weight
            </TableCell>

            <TableCell align="right">
              % of Total
            </TableCell>

          </TableRow>

        </TableHead>



        <TableBody>

          {agingData.map((item)=>(
            <TableRow key={item.bucket}>

              <TableCell>

                <Box display="flex" gap={1} alignItems="center">

                  <Box
                    sx={{
                      width:7,
                      height:7,
                      borderRadius:"50%",
                      background:item.color
                    }}
                  />

                  {item.bucket}

                </Box>

              </TableCell>


              <TableCell align="right">
                {item.totalWeight}
              </TableCell>


              <TableCell align="right">
                {item.percent}
              </TableCell>


            </TableRow>
          ))}



          <TableRow>

            <TableCell>
              <b>Total</b>
            </TableCell>

            <TableCell align="right">
              <b>23.450</b>
            </TableCell>

            <TableCell align="right">
              <b>26.5%</b>
            </TableCell>

          </TableRow>


        </TableBody>


      </Table>

    </TableContainer>


  </Paper>




  {/* Threshold Monitoring */}

  <Paper className="chart-card">


    <Box
      display="flex"
      justifyContent="space-between"
    >

      <Typography fontWeight={600}>
        Threshold Monitoring
      </Typography>


      <IconButton size="small">
        ⚙
      </IconButton>


    </Box>



    <LineChart

      height={160}

      series={[
        {
          data:[
            20,
            45,
            60,
            42,
            58,
            15,
            68,
            80
          ],
          area:false,
          color:"#2563EB"
        }
      ]}

      xAxis={[
        {
          scaleType:"point",
          data:[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug"
          ]
        }
      ]}


      yAxis={[
        {
          min:0,
          max:100
        }
      ]}

      grid={{
        horizontal:true
      }}

      margin={{
        left:40,
        right:20,
        top:20,
        bottom:25
      }}

    />

  </Paper>


</Box>

  </Box>

  );

}
