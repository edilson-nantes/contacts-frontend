import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer, Button } from "@mui/material";
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";


interface MenuDrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export function MenuDrawer({ open, toggleDrawer }: MenuDrawerProps) {
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        await logout();
        navigate('/');
    }

    const menuItems = [
        {icon: <ContactsIcon />, label: "Minhas Conexoes", path: "/connections"},
        {icon: <EmailIcon />, label: "Minhas Mensagens", path: "/messages"}
    ]

    const menuList = (
        <Box
            sx={{ width: 300, display: 'flex', flexDirection: 'column', height: '100%' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ p: 2 }}>
                <Button onClick={() => navigate('/home')}>
                    <Typography variant="h6">Menu</Typography>
                </Button>
                
            </Box>
            <Divider />
            <Box sx={{ flexGrow: 1 }}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
        >
            {menuList}
        </Drawer>
    );
};