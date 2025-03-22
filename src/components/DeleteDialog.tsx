import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Connection } from "../services/connectionService";
import { useConnections } from "../store/connections";

interface DeleteDialogProps {
    open: boolean;
    connection: Connection | null;
    handleClose: () => void;
}


export function DeleteDialog({open, connection, handleClose}: DeleteDialogProps) {
    const { removeConnection } = useConnections();
    
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{"Confirmar deleção"}</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Você tem certeza que quer excluir {connection?.name}?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={() => {
                    if (connection?.id) {
                        removeConnection(connection.id);
                    }
                    handleClose();
                }}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    )
}