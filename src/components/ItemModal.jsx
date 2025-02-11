import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Box, Button, Modal, TextField } from "@mui/material"

// eslint-disable-next-line react/prop-types
const ItemModal = ({ open, handleClose, saveItem, editItem }) => {
    const [item, setItem] = useState({ name: '', qty: '', uom: '', price: '' })

    useEffect(() => {
        if (editItem) {
            setItem(editItem)
        } else {
            setItem({ name: '', qty: '', uom: '', price: '' })
        }
    }, [editItem])

    const handleSubmit = () => {
        if (!item.name || !item.qty || !item.uom || !item.price) {
            Swal.fire('error', 'All fields must be fill', 'error')
            return
        }
        saveItem(item)
        handleClose()
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', width: 300, mt: 10 }}>
                    <h2>{editItem ? 'Update Item' : 'Add Item'}</h2>
                    <TextField 
                        fullWidth 
                        label="Item Name" 
                        value={item.name} 
                        onChange={(e) => setItem({...item, name: e.target.value})}
                        sx={{ my: 1 }}
                    />
                    <TextField 
                        fullWidth 
                        label="Quantity" 
                        value={item.qty} 
                        onChange={(e) => setItem({...item, qty: e.target.value})}
                        sx={{ my: 1 }}
                    />
                    <TextField 
                        fullWidth 
                        label="UoM" 
                        value={item.uom} 
                        onChange={(e) => setItem({...item, uom: e.target.value})}
                        sx={{ my: 1 }}
                    />
                    <TextField 
                        fullWidth 
                        label="Price" 
                        value={item.price} 
                        onChange={(e) => setItem({...item, price: e.target.value})}
                        sx={{ my: 1 }}
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }} >{editItem ? 'Update Item' : 'Add Item'}</Button>
                </Box>
            </Modal>
        </>
    )

}

export default ItemModal