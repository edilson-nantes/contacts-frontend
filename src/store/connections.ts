import { create } from "zustand";
import { createConnection, fetchConnections } from "../services/connectionService";

type Connection = {
    name: string;
}

type State = {
    connections: Connection[];
    loadConnections: () => Promise<Connection[]>;
    addConnection: (connection: Connection) => void;
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
}))