import { create } from "zustand";
import { createConnection } from "../services/connectionService";

type Connection = {
    name: string;
}

type State = {
    connections: Connection[];
    loadConnections: () => Connection[];
    addConnection: (connection: Connection) => void;
}

export const useConnections = create<State>((set) => ({
    connections: [],
    loadConnections: () => [],

    addConnection: async (connection: Connection) => {
        await createConnection(connection);
        set((state) => ({ connections: [...state.connections, connection] }));
    }
}))