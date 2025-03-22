import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { GridColDef} from '@mui/x-data-grid';
import { Navigate } from "react-router-dom"
import { MenuDrawer } from "../components/MenuDrawer"
import { useDrawer } from "../hooks/useDrawer"
import { Header } from "../components/Header"
import { ControlButtons } from "../components/ControlButtons"
import { DataTable } from "../components/DataTable";
import { useEffect, useState } from "react";
import { SaveConnectionDialog } from "../components/SaveConnectionDialog";
import { Connection } from "../services/connectionService";
import { useConnections } from "../store/connections";
import Button from "@mui/material/Button";
import { DeleteDialog } from "../components/DeleteDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export function Connections({user}: any) {
    if (!user) {
        return <Navigate to="/" />
    }

    const { drawerOpen, toggleDrawer } = useDrawer();
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const {loadConnections, connections} = useConnections();
    const [rows, setRows] = useState<Connection[]>([]);
    const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
    
    useEffect(() => {
        async function loadConnectionsAsync() {
            const newConnections = await loadConnections();
            if (JSON.stringify(newConnections) !== JSON.stringify(rows)) {
                setRows(newConnections);
            }
        }
        loadConnectionsAsync();
    }, [connections]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedConnection(null);
        setOpen(false);
    };

    const buttons = {
        addButton: {
            label: "Nova Conexão",
            variant: "contained" as const,
            color: "primary" as const,
            action: handleClickOpen
        },
    }

    const handleEditConnection = (params: any) => {
        const connectionId = params.row.id;
        const connectionName = params.row.name;

        setSelectedConnection({
            id: connectionId,
            name: connectionName
        });

        handleClickOpen();
    }

    const handleDeleteConnection = (params: any) => {
        const connectionId = params.row.id;
        const connectionName = params.row.name;

        setSelectedConnection({
            id: connectionId,
            name: connectionName
        })
        setOpenDeleteDialog(true);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 80 },
        { field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
        { field: 'contacts', headerName: 'Contatos', type: 'number', flex: 0.8, minWidth: 100 },
        {
            field: 'actions',
            headerName: 'Ações',
            renderCell: (params) => (
              <Box className="flex flex-row justify-center" gap={2}>
                <Button startIcon={ <EditIcon /> } variant="text" onClick={() => handleEditConnection(params)}>
                    Editar
                </Button>
                <Button startIcon={ <DeleteIcon /> } variant="text" color="error" onClick={() => handleDeleteConnection(params)}>
                    Excluir
                </Button>
              </Box>
              
            ), flex: 0.8, minWidth: 100
          },
      ];

    const paginationModel = { page: 0, pageSize: 10 };
    
    return (
        <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
            
            <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Box component="section" className="flex flex-col h-screen w-screen">
                <Box component="nav" className="w-screen">
                    <Header onClick={toggleDrawer} />
                </Box>

                <Box className="mt-5 mx-8 flex flex-row justify-center">
                    <ControlButtons buttons={buttons}/>
                </Box>

                <Box className="mt-5 mx-8 flex flex-row justify-center">
                    <DataTable rows={rows} columns={columns} paginationModel={paginationModel} />
                </Box>

                <SaveConnectionDialog open={open} connection={selectedConnection} handleClose={handleClose} />
                <DeleteDialog open={openDeleteDialog} connection={selectedConnection} handleClose={() => setOpenDeleteDialog(false)} />
            </Box>
        </Container>
    )
}