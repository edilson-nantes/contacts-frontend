import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { GridColDef} from '@mui/x-data-grid';
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { MenuDrawer } from "../components/MenuDrawer"
import { useDrawer } from "../hooks/useDrawer"
import { Header } from "../components/Header"
import { ControlButtons } from "../components/ControlButtons"
import { DataTable } from "../components/DataTable";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DeleteDialog } from "../components/DeleteDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SaveContactDialog } from "../components/SaveContactDialog";
import { useContacts } from "../store/contacts";
import { Contact } from "../services/contactService";


export function ConnectionContacts({user}: any) {
    if (!user) {
        return <Navigate to="/" />
    }

    const navigate = useNavigate();
    const { drawerOpen, toggleDrawer } = useDrawer();
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { contacts, loadContacts } = useContacts();
    const [rows, setRows] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const connectionId = useParams().id as string;
    
    useEffect(() => {
        async function loadContactsAsync() {
            const newContacts = await loadContacts(connectionId as string);
            if (JSON.stringify(newContacts) !== JSON.stringify(rows)) {
                setRows(newContacts);
            }
        }
        loadContactsAsync();
    }, [contacts]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedContact(null);
        setOpen(false);
    };

    const buttons = {
        addButton: {
            label: "Novo Contato",
            variant: "contained" as const,
            color: "primary" as const,
            action: handleClickOpen
        },
        auxButton: {
            label: "Enviar Mensagem",
            variant: "contained" as const,
            color: "primary" as const,
            action: () => navigate("/connections")
        }
    }

    const handleEditContact = (params: any) => {
        const contactId = params.row.id;
        const contactName = params.row.name;
        const contactPhone = params.row.phone;

        setSelectedContact({
            id: contactId,
            name: contactName,
            phone: contactPhone
        });

        handleClickOpen();
    }

    const handleDeleteContact = (params: any) => {
        const contactId = params.row.id;
        const contactName = params.row.name;
        const contactPhone = params.row.phone;

        setSelectedContact({
            id: contactId,
            name: contactName,
            phone: contactPhone
        })
        setOpenDeleteDialog(true);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 80 },
        { field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
        { field: 'phone', headerName: 'Telefone', flex: 0.8, minWidth: 100 },
        {
            field: 'actions',
            headerName: 'Ações',
            renderCell: (params) => (
              <Box className="flex flex-row justify-center" gap={2}>
                <Button startIcon={ <EditIcon /> } variant="text" onClick={() => handleEditContact(params)}>
                    Editar
                </Button>
                <Button startIcon={ <DeleteIcon /> } variant="text" color="error" onClick={() => handleDeleteContact(params)}>
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
                    <DataTable
                        title="Contatos"
                        rows={rows}
                        columns={columns}
                        paginationModel={paginationModel}
                    />
                </Box>

                <SaveContactDialog open={open} handleClose={handleClose} contact={selectedContact} connectionId={connectionId}/>
                <DeleteDialog
                    open={openDeleteDialog}
                    contact={selectedContact}
                    connectionId={connectionId}
                    handleClose={() => {
                        setSelectedContact(null);
                        setOpenDeleteDialog(false);
                    }}
                />
            </Box>
        </Container>
    )
}