import Container from "@mui/material/Container"
import { Navigate } from "react-router-dom"
import { MenuDrawer } from "../components/MenuDrawer"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useDrawer } from "../hooks/useDrawer"
import { Header } from "../components/Header"

export function Connections({user}: any) {
    if (!user) {
        return <Navigate to="/" />
    }

    const { drawerOpen, toggleDrawer } = useDrawer();
    
    return (
        <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
            
            <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Box component="section" className="flex flex-col h-screen w-screen">
                <Box component="nav" className="w-screen">
                    <Header onClick={toggleDrawer} />
                </Box>
                <Box className="flex flex-col items-center justify-center" gap={10}>
                    
                    <Typography variant="h3">Conexões</Typography>
                </Box>
            </Box>
        </Container>
    )
}