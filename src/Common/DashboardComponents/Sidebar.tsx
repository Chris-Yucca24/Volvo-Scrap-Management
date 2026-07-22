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

import { useNavigate } from "react-router-dom";

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

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
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
        path: "/UserManagement",
      },
      {
        title: "Master Data",
        children: [
          { title: "KSPCB Data", path: "/AdminKSPCB" },
          { title: "Scrap Part Number", path: "/admin/master/plant" },
          { title: "Source and Destination", path: "/admin/master/supplier" },
          { title: "Slideshow Display Images", path: "/admin/master/user-roles" },
          { title: "Vendor Management", path: "/admin/master/user-roles" },
        ],
      },
    ],
  },
];

const MenuList = ({
  items,
  level = 0,
}: {
  items: MenuItem[];
  level?: number;
}) => {
  const navigate = useNavigate();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("sidebar-open-items");
    return saved ? JSON.parse(saved) : {};
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
      {items.map((item) => (
        <React.Fragment key={item.title}>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleClick(item)}
              sx={{
                pl: 2 + level * 3,
                borderRadius: "8px",
                mb: 1,
                color: "#fff",

                "&:hover": {
                  background: "rgba(255,255,255,0.10)",
                },
              }}
            >

              {item.icon && level === 0 && (
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 40,
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
            <Collapse
              in={openItems[item.title]}
              timeout="auto"
              unmountOnExit
            >
              <MenuList
                items={item.children}
                level={level + 1}
              />
            </Collapse>
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