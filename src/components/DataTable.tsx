import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useState } from "react";
import { Connection } from "../services/connectionService";

interface DataTableProps {
    rows: any
    columns: GridColDef[]
    paginationModel: any
}

export function DataTable({ rows,columns, paginationModel }: DataTableProps) {
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
                <Typography variant="h6">Minhas Conexões</Typography>
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
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20, 50]}
                checkboxSelection
                sx={{ border: 0, padding: 0, margin: 2 }}
            />
        </Paper>
    )
}