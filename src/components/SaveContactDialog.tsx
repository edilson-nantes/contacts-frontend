import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Contact } from "../services/contactService";
import { useContacts } from "../store/contacts";


interface SaveContactDialogProps {
    connectionId: string,
    open: boolean,
    contact?: Contact | null,
    handleClose: () => void
}

export function SaveContactDialog({connectionId, open, contact, handleClose}: SaveContactDialogProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const { addContact, editContact } = useContacts();

    useEffect(() => {
        if (contact){
            setName(contact.name);
            setPhone(contact.phone);
        } else {
            setName('');
            setPhone('');
        }
    }, [contact]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (contact) {
            await editContact({...contact, name, phone}, connectionId);
        } else {
            await addContact({name, phone}, connectionId);
        }

        handleClose();
        setName('');
        setPhone('');
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
            <DialogTitle>{contact ? 'Editar': 'Criar novo'} contato</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contact ? 'Edite o contato' : 'Adicione um novo contato'}
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
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Telefone"
                    fullWidth
                    variant="standard"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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