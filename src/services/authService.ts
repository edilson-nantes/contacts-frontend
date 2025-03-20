import { createUserWithEmailAndPassword } from "firebase/auth";
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

export async function createUser(formData: CreateUser): Promise<any> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        if(user) {
            await setDoc(doc(db, "Users", user.uid), {
                name: formData.name,
                phone: formData.phone,
                email: formData.email
            });
        }
        
        return user;
    } catch (error) {
        return error;
    }
}