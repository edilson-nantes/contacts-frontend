import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MenuDrawer } from "../components/MenuDrawer";
import { MenuButton } from "../components/MenuButton";
import { useDrawer } from "../hooks/useDrawer";


export function HomePage() {
    const { drawerOpen, toggleDrawer } = useDrawer();

    const [userDetails, setUserDetails] = useState<any>(null);

    const fetchUserDetails = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
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

    return (
        <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
            <MenuButton onClick={toggleDrawer} />
            <MenuDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
            <Box component="section" className="flex flex-col items-center justify-center" gap={10}>
                <Typography variant="h2" gutterBottom>Bem vindo, {userDetails?.name}!</Typography>
                <Typography variant="h3">Acesse o menu ao lado para começar</Typography>
            </Box>
        </Container>
    );
}
