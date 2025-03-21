import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

interface ControlButtonsProps {
    buttons:{
        addButton:{
            label: string,
            variant: "contained" | "outlined" | "text",
            color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
        }
        deleteButton:{
            label: string,
            variant: "contained" | "outlined" | "text",
            color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
        }
        auxButton?: {
            label: string,
            variant: "contained" | "outlined" | "text",
            color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
        }
    }
}

//TODO: Fazer com que as funcionalidades sejam passadas como props de acordo com a página(conexão ou contato)
export function ControlButtons({buttons}: ControlButtonsProps) {
    return (
        <Card className="flex flex-row justify-between p-5 w-full">
            <Box className="flex flex-row justify-around w-2/12">
                <Button variant={buttons.addButton.variant} color={buttons.addButton.color}>{buttons.addButton.label}</Button>
                <Button variant={buttons.deleteButton.variant} color={buttons.deleteButton.color}>{buttons.deleteButton.label}</Button>
            </Box>

            {buttons.auxButton && (
                <Box className="flex flex-row justify-between w-auto">
                    <Button variant={buttons.auxButton.variant} color={buttons.auxButton.color}>{buttons.auxButton.label}</Button>
                </Box>
            )}
        </Card>
    )
}