import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useConnections } from "../store/connections";
import { Connection } from "../services/connectionService";

interface SaveConnectionDialogProps {
    open: boolean
    connection?: Connection | null
    handleClose: () => void
}

export function SaveConnectionDialog({open, connection, handleClose}: SaveConnectionDialogProps) {
    const [name, setName] = useState('');
    const { addConnection, editConnection } = useConnections();

    useEffect(() => {
        if (connection) {
            setName(connection.name);
        } else {
            setName("");
        }
    }, [connection]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (connection) {
            await editConnection({ ...connection, name });
        } else {
            await addConnection({ name });
        }

        handleClose();
    };
    
    return (
        <Dialog
            open={open}
            fullWidth={true}
            onClose={handleClose}
            slotProps={{
            paper: {
                component: 'form',
                onSubmit: handleSubmit,
            },
            }}
        >
            <DialogTitle>{connection ? 'Editar' : 'Nova'} conexão</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {connection ? 'Edite a conexão' : 'Adicione uma nova conexão'}
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Nome"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setName('');
                    handleClose();
                }}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
            </DialogActions>
        </Dialog>
    )
}