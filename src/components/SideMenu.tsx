import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import "./SideMenu.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HeaderText from "./elements/HeaderText";
import MapIcon from "@mui/icons-material/Map";
import { urlRoutes } from "../routes/urlRoutes";

const SideMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
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
      path: "/admin/audycje",
    },
    {
      text: "Placówki",
      icon: <HomeIcon fontSize="small" />,
      path: urlRoutes.places,
    },
    {
      text: "Prowadzący i muzycy",
      icon: <PersonIcon fontSize="small" />,
      path: "/admin/prowadzacy",
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
            <HeaderText fontWeight={400} fontSize={24} headerType="h3">
              Akademia Bachmana
            </HeaderText>
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
          <MenuItem>
            <ListItemIcon>
              <MapIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mapy</ListItemText>
          </MenuItem>
          <div className="d-flex justify-content-center mt-auto mb-3">
            <Button variant="contained" onClick={handleLogout}>
              Wyloguj
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <span className=" text-secondary" style={{ fontSize: 12 }}>
              Akademia Bachmana © {new Date().getFullYear()} / version 1.0.0
            </span>
          </div>
        </MenuList>
      </Paper>
    </div>
  );
};

export default SideMenu;
