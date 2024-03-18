import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
/* import Divider from "@mui/material/Divider"; */
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";


const ListOptionsStudents = () => {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/perfil">
            <ListItemText primary={"Perfil"} />
          </ListItemButton>
        </ListItem>        
    </>
    )
}

function SidebarStudent() {

  const [open, setOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ m: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <div className="flex items-center justify-center p-1" id="DrawerHead">
          <IconButton onClick={handleDrawerClose}>{"Logo"}</IconButton>
        </div>
        <List>
            <ListOptionsStudents />
        </List>
      </Drawer>
    </>
  )
}

export default SidebarStudent