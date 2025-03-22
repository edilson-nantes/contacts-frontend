import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, } from "firebase/firestore";

export interface Connection {
    id?: string;
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

export async function fetchConnections(): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const connectionRef = collection(db, "Users", user.uid, "Connections");
            const connectionSnapshot = await getDocs(connectionRef);
            const connections = connectionSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            return connections;
        }
        else {
            return undefined; 
        }
    } catch (error) {
        return error; 
    }
}

export async function updateConnection(id: string, connection: Connection): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const connectionRef = doc(db, "Users", user.uid, "Connections", id);
            await updateDoc(connectionRef, {
                name: connection.name
            });
        }
    } catch (error) {
        return error;
    }
}

export async function deleteConnection(id: string): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const connectionRef = doc(db, "Users", user.uid, "Connections", id);
            await deleteDoc(connectionRef);
        }
    } catch (error) {
        return error;
    }
}