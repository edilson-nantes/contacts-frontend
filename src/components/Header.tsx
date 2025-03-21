import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type HeaderProps = {
    onClick: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export function Header({ onClick }: HeaderProps) {

    return (
        <AppBar position="static">
            <Toolbar className="flex justify-between">
                
                <IconButton edge="start" color="inherit" onClick={(event) => onClick(true)(event)}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" className="flex-1 text-center">
                    Meu Projeto
                </Typography>

                
                    
                
            </Toolbar>
        </AppBar>
    );
}
