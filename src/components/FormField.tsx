import { TextField, FormControl } from "@mui/material";

interface FormFieldProps {
    id: string;
    name: string;
    label: string;
    type: string;
    value: string;
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ id, name, label, type, value, error, onChange }) => {
    return (
        <FormControl>
            <TextField
                error={!!error}
                helperText={error}
                variant="outlined"
                id={id}
                type={type}
                name={name}
                label={label}
                required
                fullWidth
                value={value}
                color={error ? 'error' : 'primary'}
                onChange={onChange}
            />
        </FormControl>
    );
};

export default FormField;