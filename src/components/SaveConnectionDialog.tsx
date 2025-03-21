import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useConnections } from "../store/connections";

interface SaveConnectionDialogProps {
    open: boolean
    handleClose: () => void
}

export function SaveConnectionDialog({open, handleClose}: SaveConnectionDialogProps) {
    const [name, setName] = useState('');
    const { addConnection } = useConnections();
    
    return (
        <Dialog
            open={open}
            fullWidth={true}
            onClose={handleClose}
            slotProps={{
            paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    addConnection({name});
                    handleClose();
                },
            },
            }}
        >
            <DialogTitle>Nova Conexão</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Cria uma nova conexão
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
                onChange={(e) => setName(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
            </DialogActions>
        </Dialog>
    )
}