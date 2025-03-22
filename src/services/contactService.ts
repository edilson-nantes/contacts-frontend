import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export interface Contact {
    id?: string;
    name: string;
    phone: string;
}


export async function createContact(contact: Contact, connectionId: string): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const contactRef = collection(db, "Users", user.uid, "Connections", connectionId, "Contacts");
            const newContactRef = await addDoc(contactRef, {
                name: contact.name,
                phone: contact.phone
            });

            return newContactRef.id;
        }

        return contact;
    } catch (error) {
        return error;
    }
}

export async function fetchContacts(connectionId: string): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const contactRef = collection(db, "Users", user.uid, "Connections", connectionId, "Contacts");
            const contactSnapshot = await getDocs(contactRef);
            const contacts = contactSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                phone: doc.data().phone
            }));
            return contacts;
        }
        else {
            return undefined;
        }
    } catch (error) {
        return error;
    }
}

export async function updateContact(connectionId: string, id: string, contact: Contact): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const contactRef = doc(db, "Users", user.uid, "Connections", connectionId, "Contacts", id);
            await updateDoc(contactRef, {
                name: contact.name,
                phone: contact.phone
            });
        }
    } catch (error) {
        return error;
    }
}

export async function deleteContact(id: string, connectionId: string,): Promise<any> {
    try {
        const user = auth.currentUser;
        if (user) {
            const contactRef = doc(db, "Users", user.uid, "Connections", connectionId, "Contacts", id);
            await deleteDoc(contactRef);
        }
    } catch (error) {
        return error;
    }
}