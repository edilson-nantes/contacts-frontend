import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, } from "firebase/firestore";

interface Connection {
    name: string;
}

export async function createConnection(connection: Connection): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const connectionRef = collection(db, "Users", user.uid, "Connections");
            const newConnectionRef = await addDoc(connectionRef, {
                name: connection.name
            });

            return newConnectionRef.id;
        }

        return connection;
    } catch (error) {
        return error;
    }
}