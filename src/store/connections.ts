import { create } from "zustand";
import { createConnection, deleteConnection, fetchConnections, updateConnection } from "../services/connectionService";

type Connection = {
    id?: string;
    name: string;
}

type State = {
    connections: Connection[];
    loadConnections: () => Promise<Connection[]>;
    addConnection: (connection: Connection) => void;
    editConnection: (connection: Connection) => void;
    removeConnection: (id: string) => void;
}

export const useConnections = create<State>((set) => ({
    connections: [],
    loadConnections: async () => {
        const connections = await fetchConnections();
        set({ connections });
        return connections as Connection[];
    },

    addConnection: async (connection: Connection) => {
        await createConnection(connection);
        set((state) => ({ connections: [...state.connections, connection] }));
    },

    editConnection: async (connection: Connection) => {
        const id = connection.id;
        if (!id) {
            return "Connection id not found";
        }
        await updateConnection(id, connection);
        set((state) => ({
            connections: state.connections.map((c) => {
                if (c.id === id) {
                    return connection;
                }
                return c;
            })
        }));
    },

    removeConnection: async (id: string) => {
        await deleteConnection(id);
        set((state) => ({
            connections: state.connections.filter((c) => c.id !== id)
        }));
    }
}))