import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface CreateUser {
    name: string;
    phone: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
}

interface LoginUser {
    email: string;
    password: string;
}

export async function createUser(createData: CreateUser): Promise<any> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, createData.email, createData.password);
        const user = userCredential.user;

        if(user) {
            await setDoc(doc(db, "Users", user.uid), {
                name: createData.name,
                phone: createData.phone,
                email: createData.email
            });
        }
        
        return user;
    } catch (error) {
        return error;
    }
}

export async function login(loginData: LoginUser): Promise<any>  {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        return error;
    }
}

export async function logout(): Promise<any> {
    try {
        await auth.signOut();
    } catch (error) {
        return error;
    }
}