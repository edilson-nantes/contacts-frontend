import Container from "@mui/material/Container"
import { Navigate } from "react-router-dom"
import { MenuDrawer } from "../components/MenuDrawer"
import Box from "@mui/material/Box"
import { useDrawer } from "../hooks/useDrawer"
import { Header } from "../components/Header"
import { ControlButtons } from "../components/ControlButtons"

export function Connections({user}: any) {
    if (!user) {
        return <Navigate to="/" />
    }

    const { drawerOpen, toggleDrawer } = useDrawer();

    const buttons = {
        addButton: {
            label: "Nova Conexão",
            variant: "contained" as const,
            color: "primary" as const
        },
        deleteButton: {
            label: "Excluir",
            variant: "outlined" as const,
            color: "error" as const
        }
    }
    
    return (
        <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
            
            <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Box component="section" className="flex flex-col h-screen w-screen">
                <Box component="nav" className="w-screen">
                    <Header onClick={toggleDrawer} />
                </Box>
                <Box className="mt-5 mx-8 flex flex-row justify-center">
                    
                    {/* TODO: Fazer com que as funcionalidades sejam passadas como props para genrenciar as conexões */}
                    <ControlButtons buttons={buttons}/>

                </Box>
            </Box>
        </Container>
    )
}