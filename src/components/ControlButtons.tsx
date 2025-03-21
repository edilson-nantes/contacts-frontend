import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

interface ControlButtonsProps {
    buttons:{
        addButton:{
            label: string,
            variant: "contained" | "outlined" | "text",
            color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
            action?: () => void
        }
        deleteButton:{
            label: string,
            variant: "contained" | "outlined" | "text",
            color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
            action?: () => void
        }
        auxButton?: {
            label: string,
            variant: "contained" | "outlined" | "text",
            color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
            action?: () => void
        }
    }
}

export function ControlButtons({buttons}: ControlButtonsProps) {
    return (
        <Card className="flex flex-row justify-between p-5 w-full">
            <Box className="flex flex-row justify-around w-2/12">
                <Button
                    variant={buttons.addButton.variant}
                    color={buttons.addButton.color}
                    onClick={buttons.addButton.action}
                >
                    {buttons.addButton.label}
                </Button>
                <Button
                    variant={buttons.deleteButton.variant}
                    color={buttons.deleteButton.color}
                    onClick={buttons.deleteButton.action}
                >
                    {buttons.deleteButton.label}
                </Button>
            </Box>

            {buttons.auxButton && (
                <Box className="flex flex-row justify-between w-auto">
                    <Button
                        variant={buttons.auxButton.variant}
                        color={buttons.auxButton.color}
                        onClick={buttons.auxButton.action}
                    >
                        {buttons.auxButton.label}
                    </Button>
                </Box>
            )}
        </Card>
    )
}