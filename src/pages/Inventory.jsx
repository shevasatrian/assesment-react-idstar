// Inventory.jsx
import { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import Header from "../components/Header";
import { Box, Button, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import ItemModal from "../components/ItemModal";

const Inventory = () => {
    const { inventory, handleSave, handleDelete } = useInventory()
    const [modalOpen, setModalOpen] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1)
    const itemsPerPage = 6

    const filteredItems = inventory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

    return (
        <>
            <Header />
            <Container>
                <h2>Inventory Management</h2>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button variant="contained" color="primary" onClick={() => { setEditItem(null); setModalOpen(true); }}>Add Item</Button>
                    <TextField
                        label="Search Item"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: 200, borderRadius: 3, backgroundColor: "white" }}
                    />
                </Box>
                <ItemModal open={modalOpen} handleClose={() => setModalOpen(false)} saveItem={(item) => handleSave(item, editItem, setModalOpen)} editItem={editItem} />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>UoM</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.qty}</TableCell>
                                    <TableCell>{item.uom}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                        <Button sx={{ height: 20 }} onClick={() => { setEditItem(item); setModalOpen(true); }}>Edit</Button>
                                        <Button sx={{ height: 20, color: 'red' }} onClick={() => handleDelete(item.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                />
            </Container>
        </>
    );
};

export default Inventory;
