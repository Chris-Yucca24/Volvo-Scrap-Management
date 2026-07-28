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

import { useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserIcon from "../../assets/image-assets/User-Icon.svg"
import MasterIcon from "../../assets/image-assets/Master-icon.svg"

import sidebarWatermark from "../../assets/image-assets/VOLVO_WATERMARK.svg";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  defaultOpen?: boolean;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/AdminOutbound",

    children: [
      {
        title: "Inbound Overview",
        path: "/AdminInbound",
      },
      {
        title: "Outbound Overview",
        path: "/AdminOutbound",
      },
    ],
  },
  {
    title: "Reports",
    icon: <AssignmentIcon />,
    path: "/LevelManagement",
  },
  {
    title: "Admin Settings",
    icon: <SettingsIcon />,
    children: [
      {
        title: "User Management",
        // icon: (
        //   <img
        //     src={UserIcon}
        //     alt="User"
        //     style={{
        //       width: 18,
        //       height: 18,
        //     }}
        //   />
        // ),
        path: "/UserManagement",

      },
      {
        title: "Master Data",
        // icon: <img
        //   src={MasterIcon}
        //   alt="User"
        //   style={{
        //     width: 18,
        //     height: 18,
        //   }}
        // />,
        children: [
          { title: "KSPCB Data", path: "/AdminKSPCB" },
          { title: "Scrap Part Number", path: "/AdminScrapPart" },
          { title: "Source Management", path: "/AdminSourceDestination" },
          { title: "Slideshow Display Images", path: "/AdminSlideDisplay" },
          { title: "Vendor Management", path: "/AdminVendor" },
        ],
      },
    ],
  },
];

const MenuList = ({
  items,
  level = 0,
  parentTitle,
}: {
  items: MenuItem[];
  level?: number;
  parentTitle?: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("sidebar-open-items");

    const defaults: Record<string, boolean> = {};

    items.forEach((item) => {
      if (item.defaultOpen) {
        defaults[item.title] = true;
      }
    });

    return {
      ...defaults,
      ...(saved ? JSON.parse(saved) : {}),
    };
  });

  const handleClick = (item: MenuItem) => {
    if (item.children) {
      setOpenItems((prev) => {
        const updated = {
          ...prev,
          [item.title]: !prev[item.title],
        };

        localStorage.setItem(
          "sidebar-open-items",
          JSON.stringify(updated)
        );

        return updated;
      });
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <List disablePadding>
      {items.map((item, index) => (
        <React.Fragment key={item.title}>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(item)}
            sx={{
  pl: 2 + level * 3,
  borderRadius: "8px",
  mb: parentTitle === "Dashboard" || parentTitle === "Master Data" ? 0 : 1,
  ml: parentTitle === "Dashboard" ? 2.5 : 0,
  color: "#fff",
  position: "relative",

  backgroundColor:
    location.pathname === item.path
      ? "rgba(255,255,255,0.12)"
      : "transparent",

  "&:hover": {
    background: "rgba(255,255,255,0.10)",
  },

  "&::before": {
    ...(parentTitle === "Dashboard" || parentTitle === "Master Data"
      ? {
          content: '""',
          position: "absolute",
          left: `${20 + (level - 1) * 24}px`,
          top: index === 0 ? "50%" : 0,
          bottom: index === items.length - 1 ? "50%" : 0,
          width: "1px",
          backgroundColor: "rgba(255,255,255,0.35)",
        }
      : {}),
  },

  "&::after": {
    ...(parentTitle === "Dashboard" || parentTitle === "Master Data"
      ? {
          content: '""',
          position: "absolute",
          left: `${16 + (level - 1) * 24}px`,
          top: "50%",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          transform: "translateY(-50%)",

          // Filled when selected
          backgroundColor:
            location.pathname === item.path
              ? "#ffffff"
              : "transparent",

          border: "1px solid #f5f5f5",
        }
      : {}),
  },
}}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 28,
                    mr: 0.7,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}

              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: level === 0 ? "14px" : "12px",
                  fontWeight: level === 0 ? 500 : 400,
                }}
              />


              {item.children &&
                (openItems[item.title] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                ))}

            </ListItemButton>
          </ListItem>


          {item.children && (
            item.title === "Dashboard" ? (
              <MenuList
                items={item.children}
                level={level + 1}
                parentTitle={item.title}
              />
            ) : (
              <Collapse
                in={openItems[item.title]}
                timeout="auto"
                unmountOnExit
              >
                <MenuList
                  items={item.children}
                  level={level + 1}
                  parentTitle={item.title}
                />
              </Collapse>
            )
          )}
        </React.Fragment>
      ))}
    </List>
  );
};
const Sidebar: React.FC<SidebarProps> = ({
  open = true,
  onClose,
}) => {
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
          background:
            "linear-gradient(135deg, #00214C 0%, #003274 100%)",
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

        {/* Sidebar Menu */}
        <Box
          sx={{
            flex: 1,
            px: 2,
            pt: 2,
            pb: 12,
            overflowY: "auto",
          }}
        >
          <MenuList items={menuItems} />
        </Box>


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