import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GridColDef, GridEventListener } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useState } from "react";
import { Connection } from "../services/connectionService";

interface DataTableProps {
    title: string
    rows: any
    columns: GridColDef[]
    paginationModel: any
    onRowClick?: GridEventListener<'rowClick'>;
}

export function DataTable({ title, rows, columns, paginationModel, onRowClick }: DataTableProps) {
    const [searchText, setSearchText] = useState('');
    const [filteredRows, setFilteredRows] = useState<Connection[]>([]);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value.toLowerCase();
        const filteredRows = rows.filter((row: { [s: string]: unknown; } | ArrayLike<unknown>) => {
            const rowValues = Object.values(row);
            return rowValues.some((value) => {
                return String(value).toLowerCase().includes(searchText);
            });
        });
        setFilteredRows(filteredRows);
        setSearchText(event.target.value);
    };
    
    return (
        <Paper sx={{ height: "max-content", width: '100%', }}>
            <Box className="mt-5 mx-8 flex flex-row justify-between">
                <Typography variant="h6">{title}</Typography>
                <TextField
                    id="search"
                    label="Pesquisar"
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearch}
                />
            </Box>
            <DataGrid 
                rows={searchText ? filteredRows : rows}
                getRowId={(row) => row.id}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20, 50]}
                disableRowSelectionOnClick={true}
                sx={{ border: 0, padding: 0, margin: 2 }}
                onRowClick={onRowClick}
            />
        </Paper>
    )
}