import {create} from "zustand";
import { createContact, deleteContact, fetchContacts, updateContact } from "../services/contactService";

type Contact = {
    id?: string;
    name: string;
    phone: string;
}

type State = {
    contacts: Contact[];
    loadContacts: (connectionId: string) => Promise<Contact[]>;
    addContact: (contact: Contact, connectionId: string) => void;
    editContact: (contact: Contact, connectionId: string) => void;
    removeContact: (id: string, connectionId: string) => void;
}

export const useContacts = create<State>((set) => ({
    contacts: [],

    loadContacts: async (connectionId: string) => {
        const contacts = await fetchContacts(connectionId);
        set({ contacts });
        return contacts as Contact[];
    },

    addContact: async (contact: Contact, connectionId: string) => {
        await createContact(contact, connectionId);
        set((state) => ({ contacts: [...state.contacts, contact] }));
    },

    editContact: async (contact: Contact, connectionId: string) => {
        const id = contact.id;
        if (!id) {
            return "Contact id not found";
        }
        await updateContact(connectionId, id, contact);
        set((state) => ({
            contacts: state.contacts.map((c) => {
                if (c.id === id) {
                    return contact;
                }
                return c;
            })
        }));
    },

    removeContact: async (id: string, connectionId: string) => {
        await deleteContact(id, connectionId);
        set((state) => ({
            contacts: state.contacts.filter((c) => c.id !== id)
        }));
    }
}))