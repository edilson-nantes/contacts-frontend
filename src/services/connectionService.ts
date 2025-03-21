import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, getDocs, } from "firebase/firestore";

export interface Connection {
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

export async function fetchConnections(): Promise<Connection[]> {
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
        } else {
            return []; // Add this line to return an empty array if user is falsy
        }
    } catch (error) {
        return []; // You may also want to handle the error here
    }
}