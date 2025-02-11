import { useEffect, useState } from "react"
// import Swal from "sweetalert2"
import Header from "../components/Header"
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import ItemModal from "../components/ItemModal"
import Swal from "sweetalert2"

const defaultData = [
    {id: 1, name: 'Aren Sugar', qty: 1, uom: 'kg', price: 60000},
    {id: 2, name: 'Milk', qty: 1, uom: 'Liter', price: 30000},
    {id: 3, name: 'Ice Cube', qty: 1, uom: 'kg', price: 15000},
    {id: 4, name: 'Plastic Cup', qty: 10, uom: 'pcs', price: 5000},
    {id: 5, name: 'Coffee Bean', qty: 1, uom: 'kg', price: 100000},
    {id: 6, name: 'Mineral Water', qty: 1, uom: 'Liter', price: 5000}
] 

const Inventory = () => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(defaultData))
        const storedItems = JSON.parse(localStorage.getItem('inventory')) || defaultData;
        setItems(storedItems);
    }, [])

    const saveItem = (item) => {
        const updatedItems = editItem ? items.map(i => (i.id === editItem.id ? item : i)) : [...items, { ...item, id: items.length + 1 }]
        setItems(updatedItems)
        localStorage.setItem('inventory', JSON.stringify(updatedItems))
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const updatedItems = items.filter(item => item.id !== id)
                setItems(updatedItems)
                localStorage.setItem('inventory', JSON.stringify(updatedItems))
                Swal.fire('Deleted', 'Item has been deleted.', 'success')
            }
          })
    }

    return (
        <>
            <Header />

            <Container>
                <div>
                    <h2>Inventory Management</h2>
                    <div>
                        {/* <TextField label="" /> */}
                        <Button variant="contained" color="primary" onClick={() => { setEditItem(null); setModalOpen(true); }}>Add Item</Button>
                        <ItemModal open={modalOpen} handleClose={() => setModalOpen(false)} saveItem={saveItem} editItem={editItem}  />
                    </div>
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
                            {items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell>{item.uom}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>
                                    <Button sx={{ height: 20 }} onClick={() => {setEditItem(item); setModalOpen(true) }}>Edit</Button>
                                    <Button sx={{ height: 20, color: 'red' }} onClick={() => handleDelete(item.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
            
        </>
    )
}

export default Inventory