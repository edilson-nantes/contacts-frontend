import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

interface SaveConnectionDialogProps {
    open: boolean
    handleClose: () => void
}

export function SaveConnectionDialog({open, handleClose}: SaveConnectionDialogProps) {
    return (
        <Dialog
            open={open}
            fullWidth={true}
            onClose={handleClose}
            slotProps={{
            paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    
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
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
            </DialogActions>
        </Dialog>
    )
}