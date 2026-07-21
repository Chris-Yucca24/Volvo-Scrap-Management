import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import sidebarWatermark from "../../assets/image-assets/VOLVO_WATERMARK.svg";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    title: "Reports",
    icon: <AssignmentIcon />,
    path: "/reports",
  },
  {
    title: "Admin Settings",
    icon: <SettingsIcon />,
    children: [
      {
        title: "User Management",
        path: "/admin/users",
      },
      {
        title: "Master Data",
        path: "/admin/roles",
      },
     
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open = true, onClose }) => {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        width: 260,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          background: "linear-gradient(135deg, #00214C 0%, #003274 100%)",
          borderRight: "1px solid #E5E7EB",
          color: "#ffffff",
          top: "64px",
          height: "calc(100% - 64px)",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List sx={{ px: 2, pt: 2 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.title}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      setAdminOpen(!adminOpen);
                    }
                  }}
                  sx={{
                    borderRadius: "8px",
                    mb: 1,
                    color: "#fff",

                    "&:hover": {
                      background: "rgba(255,255,255,0.10)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#fff",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  />

                  {item.children &&
                    (adminOpen ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    ))}
                </ListItemButton>
              </ListItem>

              {item.children && (
                <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.title} disablePadding>
                        <ListItemButton
                          sx={{
                            pl: 7,
                            py: 0.75,
                            color: "#D8E6F2",

                            "&:hover": {
                              background: "rgba(255,255,255,0.08)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={child.title}
                            primaryTypographyProps={{
                              fontSize: "13px",
                              fontWeight: 400,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Watermark */}
        <Box
          component="img"
          src={sidebarWatermark}
          alt="watermark"
          sx={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            opacity: 0.9,
            pointerEvents: "none",
          }}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;