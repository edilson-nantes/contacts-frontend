import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { GridColDef} from '@mui/x-data-grid';
import { Navigate } from "react-router-dom"
import { MenuDrawer } from "../components/MenuDrawer"
import { useDrawer } from "../hooks/useDrawer"
import { Header } from "../components/Header"
import { ControlButtons } from "../components/ControlButtons"
import { DataTable } from "../components/DataTable";
import Button from "@mui/material/Button";
import { useState } from "react";
import { SaveConnectionDialog } from "../components/SaveConnectionDialog";

//TODO: Buscar dados das conexões no firebase
export function Connections({user}: any) {
    if (!user) {
        return <Navigate to="/" />
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { drawerOpen, toggleDrawer } = useDrawer();

    const buttons = {
        addButton: {
            label: "Nova Conexão",
            variant: "contained" as const,
            color: "primary" as const,
            action: handleClickOpen
        },
        deleteButton: {
            label: "Excluir",
            variant: "outlined" as const,
            color: "error" as const
        }
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 80 },
        { field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
        { field: 'contacts', headerName: 'Contatos', type: 'number', flex: 0.8, minWidth: 100 },
        { field: 'actions', headerName: 'Ações', type: 'number', flex: 0.8, minWidth: 120 },
      ];

    const paginationModel = { page: 0, pageSize: 5 };
    
    return (
        <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
            
            <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Box component="section" className="flex flex-col h-screen w-screen">
                <Box component="nav" className="w-screen">
                    <Header onClick={toggleDrawer} />
                </Box>
                <Box className="mt-5 mx-8 flex flex-row justify-center">
                    
                    {/* TODO: Crar as funcionalidades genrenciar as conexões */}
                    <ControlButtons buttons={buttons}/>

                </Box>

                <Box className="mt-5 mx-8 flex flex-row justify-center">
                    
                    {/* TODO: Passar os dados da tabela como props */}
                    <DataTable rows={[]} columns={columns} paginationModel={paginationModel} />
                    

                </Box>

                <SaveConnectionDialog open={open} handleClose={handleClose} />
            </Box>
        </Container>
    )
}