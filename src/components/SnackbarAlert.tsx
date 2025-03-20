import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

interface SnackbarAlertProps {
    open: boolean,
    message: string,
    severity: "success" | "error" | "warning" | "info";
    onClose: (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
}

export function SnackbarAlert({ open, message, severity, onClose }: SnackbarAlertProps) {
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}