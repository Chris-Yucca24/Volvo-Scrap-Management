import {
  BarChart,
  LineChart,
  PieChart
} from "@mui/x-charts";

import {
  Box,
  Typography,
  Paper,
  Icon
} from "@mui/material";


import TotalScrap from "../../../assets/image-assets/Total_scrap.svg"
import InVentory from "../../../assets/image-assets/Inventory-new.svg"
import Disposable_schedule from "../../../assets/image-assets/Disposablecompleted.svg"


const summaryCards = [
  {
    title: "Total Scrap Received",
    value: "125.60 T",
     icon:TotalScrap
  },
  {
    title: "Inventory on hand",
    value: "2310.650 T",
    icon:InVentory
    
  },
  {
    title: "Disposal scheduled",
    value: "85.230 T",
    icon: Disposable_schedule
  },
  {
    title: "Disposal Completed",
    value: "68.400 T",
    color: "#3DBAC7"
  },
  {
    title: "Hazardous Scrap",
    value: "18.300 T",
    color: "#EF5B63"
  }
]


export default function AdminInbound() {

  return (

    <Box className="dashboard-container">


      {/* Title */}

      <Box className="dashboard-header">

        <Typography variant="h6">
          Inbound Overview
        </Typography>

        <Typography>
          ↻ Last Updated : 28 June 2026 10:38 pm
        </Typography>

      </Box>



      {/* Cards */}

      <Box className="summary-grid">

        {
          summaryCards.map((card) => (
            <Paper className="summary-card">

              <Box
  className="icon-box"
  sx={{
    background: card.color
  }}
>
  <img
    src={card.icon}
    alt={card.title}
  />
</Box>

              <Box>

                <Typography>
                  {card.title}
                </Typography>

                <Typography fontWeight={700}>
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
          height:"280px"}}>

          <Typography>
            Scrap by Source Location (T)
          </Typography>


          <BarChart

            xAxis={[
              {
                scaleType: 'band',
                data: [
                  "Plant 1",
                  "Plant 2",
                  "Plant 3",
                  "Plant 4",
                  "Plant 5",
                  "Plant 6",
                  "Plant 7"
                ]
              }
            ]}

            series={[
             {
      data: [58, 50, 38, 30, 22, 20, 5],
      color: "#4B5CEB",
      
    }
            ]}
             height={250}
  slotProps={{
    bar: {
      rx: 8, // rounded corners
      ry: 8
    }
  }}
   categoryGapRatio={0.7}

          

          />

        </Paper>
        <Paper className="chart-card" sx={{
          height:"280px"
        }}>

          <Typography>
            Scrap by Material Type (T)
          </Typography>


          <PieChart

            series={[
              {
                data: [
                  {
                    id: 0,
                    value: 52.4,
                    label: "Metal Scrap"
                  },
                  {
                    id: 1,
                    value: 28.1,
                    label: "Rubber"
                  },
                  {
                    id: 2,
                    value: 22.3,
                    label: "Glass"
                  },
                  {
                    id: 3,
                    value: 9.9,
                    label: "Battery Waste"
                  },
                  {
                    id: 4,
                    value: 22.3,
                    label: "Hazardous"
                  }
                ],
                

                innerRadius: 50

              }
            ]}

            height={250}

          />

        </Paper>





        <Paper className="chart-card" sx={{
          height:"280px"
        }} >

          <Typography>
            Scrap Generation Trend(T)
          </Typography>


          <LineChart

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
                  "13"
                ]
              }
            ]}

            series={[
              {
                data: [
                  10, 22, 27, 21, 26, 13, 22, 18, 23, 21, 7, 22, 19
                ],
                label: "Current"
              },
              {
                data: [
                  10, 19, 15, 24, 18, 20, 6, 14, 11, 12, 8, 12, 15
                ],
                label: "Previous"
              }
            ]}

            height={250}

          />


        </Paper>


      </Box>


    </Box>

  )

}