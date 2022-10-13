import {
  AppBar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { useEffect, useState } from "react";
import { getDataFromLocalStorage, logout } from "../utils/localstorageUtils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [menuBtn, setMenuBtn] = useState<null | HTMLElement>(null);

  const open = Boolean(menuBtn);

  const onClickMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuBtn(event.currentTarget);
  };
  const onClickMenuClose = () => {
    setMenuBtn(null);
  };

  const onClickLogout = () => {
    logout();
    navigate("/auth/login");
  };

  useEffect(() => {
    const user = JSON.parse(getDataFromLocalStorage("user"));

    if (user) {
      setUserName(user.name);
    }
  }, [userName]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <WorkIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Job Seek
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onClickMenuOpen}
          >
            <SettingsIcon />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={menuBtn}
            open={open}
            onClose={onClickMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              <MenuItem>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> {userName}</ListItemText>
              </MenuItem>
              <MenuItem onClick={onClickLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderComponent;
