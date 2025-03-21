import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MenuDrawer } from "../components/MenuDrawer";
import { useDrawer } from "../hooks/useDrawer";
import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Header } from "../components/Header";


export function HomePage({ user }: any) {
    if (!user) {
        return <Navigate to="/" />
    }

    const { drawerOpen, toggleDrawer } = useDrawer();

    const [userDetails, setUserDetails] = useState<any>(null);

    const fetchUserDetails = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        });
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    if (!userDetails) {
        return (
            <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
                <Box component="section" className="flex flex-col items-center justify-center" gap={10}>
                    <CircularProgress size="10rem"/>
                </Box>
            </Container>
        );
    }

    return (
        <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
            
            <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Box component="section" className="flex flex-col h-screen w-screen">
                <Box component="nav" className="w-screen">
                    <Header onClick={toggleDrawer} />
                </Box>
                <Box className="flex flex-col items-center justify-center" gap={10}>
                    <Typography variant="h2" gutterBottom>Bem vindo, {userDetails?.name}!</Typography>
                    <Typography variant="h3">Acesse o menu ao lado para começar</Typography>
                </Box>
            </Box>
        </Container>
    );
}
