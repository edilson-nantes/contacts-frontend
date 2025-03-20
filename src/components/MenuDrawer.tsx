import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from "@mui/material";
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

    const menuList = (
        <Box
            sx={{ width: 300, display: 'flex', flexDirection: 'column', height: '100%' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Menu</Typography>
            </Box>
            <Divider />
            <Box sx={{ flexGrow: 1 }}>
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => { console.log("Minhas Conexões") }}>
                            <ListItemIcon><ContactsIcon /></ListItemIcon>
                            <ListItemText primary="Minhas Conexões" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => { console.log("Minhas Mensagens") }}>
                            <ListItemIcon><EmailIcon /></ListItemIcon>
                            <ListItemText primary="Minhas Mensagens" />
                        </ListItemButton>
                    </ListItem>
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