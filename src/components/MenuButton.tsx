import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type MenuButtonProps = {
    onClick: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export function MenuButton({ onClick }: MenuButtonProps) {
    return (
        <Box className="absolute top-0 left-0 m-4">
            <IconButton onClick={(event) => onClick(true)(event)}>
                <MenuIcon fontSize="large" />
            </IconButton>
        </Box>
    );
}