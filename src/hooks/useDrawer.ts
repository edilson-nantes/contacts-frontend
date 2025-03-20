import { useState } from "react";

export function useDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event?.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    return { drawerOpen, toggleDrawer };
}