import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

interface DataTableProps {
    rows: any
    columns: GridColDef[]
    paginationModel: any
}

export function DataTable({ rows,columns, paginationModel }: DataTableProps) {
    
    
    return (
        <Paper sx={{ height: "max-content", width: '100%', }}>
            <Box className="mt-5 mx-8 flex flex-row justify-between">
                <Typography variant="h6">Minhas Conexões</Typography>
                <TextField id="outlined-basic" label="Pesquisar" variant="outlined" />
            </Box>
            <DataGrid 
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20, 50]}
                checkboxSelection
                sx={{ border: 0, padding: 0, margin: 2 }}
            />
        </Paper>
    )
}