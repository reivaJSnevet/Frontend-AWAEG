import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import NoteIcon from "@mui/icons-material/Note";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SchoolIcon from "@mui/icons-material/School";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GroupsIcon from "@mui/icons-material/Groups";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import Divider from "@mui/material/Divider";
import { ListItemIcon } from "@mui/material";
import { useUserStore } from "../../../stores";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import GradeIcon from '@mui/icons-material/Grade';
import InventoryIcon from '@mui/icons-material/Inventory';

const ListOptions = () => {
    const user = useUserStore((state) => state.user);
    const logout = useLogout();
    const nav = useNavigate();

    const signOut = async () => {
        await logout();
        nav("/");
    };
    return (
        <>
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {user?.user?.Role?.roleName === "director" ? (
                    <div>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="roles">
                                <ListItemIcon>
                                    <VpnKeyIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Roles"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="users">
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Usuarios"} />
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="middle" />
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="functionaries">
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Funcionarios"} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="groups">
                                <ListItemIcon>
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Secciones"} />
                            </ListItemButton>
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="caregivers">
                                <ListItemIcon>
                                    <EscalatorWarningIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Encargados"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="students">
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Estudiantes"} />
                            </ListItemButton>
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="grades">
                                <ListItemIcon>
                                    <NoteIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Calificaciones"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="courses">
                                <ListItemIcon>
                                    <ScheduleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Horarios"} />
                            </ListItemButton>
                        </ListItem>

                        <Divider variant="middle" />
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="files">
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Archivos"} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="applications">
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Solicitudes"} />
                            </ListItemButton>
                        </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="supplies">
                        <ListItemIcon>
                           <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Insumos"} />
                    </ListItemButton>
                </ListItem>
                    </div>
                ) : user?.user?.Role?.roleName === "maestra" ? (
                    <div>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="files">
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Archivos"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="grades">
                                <ListItemIcon>
                                    <NoteIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Calificaciones"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="applications">
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Solicitudes"} />
                            </ListItemButton>
                        </ListItem>
                    </div>
                ) : (
                    <div>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="profile">
                                <ListItemIcon>
                                    <AssignmentIndIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Perfil"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="mygrades">
                                <ListItemIcon>
                                    <GradeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Notas"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="schedule">
                                <ListItemIcon>
                                    <ScheduleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Mi horario"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="preregistration"
                            >
                                <ListItemIcon>
                                    <AppRegistrationIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Prematrícula"} />
                            </ListItemButton>
                        </ListItem>

                    </div>
                )}
            </div>
            <div style={{ flexGrow: 1 }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={signOut}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText
                            className="text-red-600"
                            primary={"Cerrar Sesión"}
                        />
                    </ListItemButton>
                </ListItem>
            </div>
        </>
    );
};

function Sidebar() {
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
                sx={{ m: 2 }}
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
                <div
                    className="flex items-center justify-center p-1"
                    id="DrawerHead"
                >
                    <IconButton onClick={handleDrawerClose}>
                        <img
                            src="/logo-removebg-sidebar.webp"
                            alt="Image"
                            style={{ width: "100px", height: "auto" }}
                        />
                    </IconButton>
                </div>
                <List>
                    <ListOptions />
                </List>
            </Drawer>
        </>
    );
}

export default Sidebar;
