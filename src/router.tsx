import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export function Router() {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        })
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user ? <Navigate to ="/home" /> : <LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage  user={user}/>} />
            </Routes>
        </BrowserRouter>
    );
}