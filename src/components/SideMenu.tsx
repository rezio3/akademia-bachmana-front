import { useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./SideMenu.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CustomText from "./elements/CustomText";
import MapIcon from "@mui/icons-material/Map";
import { urlRoutes } from "../routes/urlRoutes";
import { LocationTypeMap, LocationTypeLabels } from "../common"; // dostosuj ścieżkę

const SideMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openMaps, setOpenMaps] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(urlRoutes.loginPage);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      path: urlRoutes.dashboard,
    },
    {
      text: "Audycje",
      icon: <MusicNoteIcon fontSize="small" />,
      path: urlRoutes.audycje,
    },
    {
      text: "Placówki",
      icon: <HomeIcon fontSize="small" />,
      path: urlRoutes.places,
    },
    {
      text: "Prowadzący i muzycy",
      icon: <PersonIcon fontSize="small" />,
      path: urlRoutes.persons,
    },
  ];

  const locations = [
    {
      id: LocationTypeMap.Lubuskie,
      label: LocationTypeLabels.Lubuskie,
      url: "https://www.google.com/maps/d/u/1/edit?mid=1DRsLv0qe-tlWJFW3Ro5OkAi5wZAo3IM&ll=52.894142951766256%2C15.038412099999999&z=9",
    },
    {
      id: LocationTypeMap.Mazowieckie,
      label: LocationTypeLabels.Mazowieckie,
      url: "https://www.google.com/maps/d/u/1/edit?mid=1rLd4NFuyfnngjZ87LLnggd-tJQBuFuk&ll=52.07117561657083%2C20.961028549999995&z=10",
    },
    {
      id: LocationTypeMap.Lodzkie,
      label: LocationTypeLabels.Lodzkie,
      url: "https://www.google.com/maps/d/u/1/edit?mid=16dcLyxiXrSBJHYevGB-w4n779bAFI7g&ll=51.64149774155436%2C19.337990799999986&z=9",
    },
    {
      id: LocationTypeMap.KujawskoPomorskie,
      label: LocationTypeLabels.KujawskoPomorskie,
      url: "https://www.google.com/maps/d/u/1/edit?mid=126oXG7NM35Fjyy2vWAB3_3EwCa4P_bc&ll=52.69207452633576%2C19.314556750000012&z=9",
    },
  ];

  return (
    <div className="side-menu">
      <Paper
        sx={{
          width: 320,
          maxWidth: "100%",
          background: "rgb(255, 250, 250)",
        }}
      >
        <MenuList style={{ minHeight: "100%" }} className="d-flex flex-column">
          <div className="d-flex justify-content-center my-4">
            <CustomText fontWeight={400} fontSize={24} headerType="h3">
              Akademia Bachmana
            </CustomText>
          </div>
          <Divider
            className="mb-2"
            sx={{
              borderColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          ))}
          <Divider
            sx={{
              borderColor: "rgba(0, 0, 0, 0.5)",
            }}
          />

          {/* Rozwijane menu Map */}
          <MenuItem onClick={() => setOpenMaps(!openMaps)}>
            <ListItemIcon>
              <MapIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mapy</ListItemText>
            {openMaps ? (
              <ExpandLess style={{ color: "gray" }} />
            ) : (
              <ExpandMore style={{ color: "gray" }} />
            )}
          </MenuItem>

          <Collapse in={openMaps} timeout="auto" unmountOnExit>
            <MenuList component="div" disablePadding>
              {locations.map((location) => (
                <MenuItem
                  key={location.id}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    window.open(location.url, "_blank");
                  }}
                >
                  <ListItemText>{location.label}</ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          </Collapse>

          <div className="d-flex justify-content-center mt-auto mb-3">
            <Button variant="contained" onClick={handleLogout}>
              Wyloguj
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <span className="text-secondary" style={{ fontSize: 12 }}>
              Akademia Bachmana © {new Date().getFullYear()} / version 1.0.0
            </span>
          </div>
        </MenuList>
      </Paper>
    </div>
  );
};

export default SideMenu;
