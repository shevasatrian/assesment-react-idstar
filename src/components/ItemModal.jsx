import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material"

// eslint-disable-next-line react/prop-types
const ItemModal = ({ open, handleClose, saveItem, editItem }) => {
    const [item, setItem] = useState({ name: '', qty: '', uom: '', price: '' })
    const [errors, setErrors] = useState({ qty: '', price: '' })

    useEffect(() => {
        if (editItem) {
            setItem(editItem)
        } else {
            setItem({ name: '', qty: '', uom: '', price: '' })
        }
    }, [editItem])

    const validateInput = (field, value) => {
        if (field === 'qty' || field === 'price') {
            if (value === '' || isNaN(value) || Number(value) <= 0) {
                setErrors((prev) => ({ ...prev, [field]: `${field === 'qty' ? 'Quantity' : 'Price'} must be a number greater than 0` }));
            } else {
                setErrors((prev) => ({ ...prev, [field]: '' }));
            }
        }
    }

    const handleChange = (field, value) => {
        if (field === 'qty' || field === 'price') {
            if (Number(value) < 0) return;
        }
        setItem({ ...item, [field]: value });
        validateInput(field, value);
    }

    const handleSubmit = () => {
        if (!item.name || !item.qty || !item.uom || !item.price) {
            handleClose()
            Swal.fire('error', 'All fields must be fill', 'error')
            return
        }

        if (item.qty <= 0) {
            handleClose()
            Swal.fire('error', 'Qty must be more than 0', 'error')
            return
        }

        if (item.price <= 0) {
            handleClose()
            Swal.fire('error', 'Price must be more than 0', 'error')
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
                        onChange={(e) => handleChange('name', e.target.value)}
                        sx={{ my: 1 }}
                    />
                    <TextField 
                        fullWidth 
                        label="Quantity"
                        type="number" 
                        value={item.qty} 
                        onChange={(e) => handleChange('qty', e.target.value)}
                        error={!!errors.qty}
                        helperText={errors.qty}
                        sx={{ my: 1 }}
                    />
                    <TextField
                        fullWidth 
                        select
                        label="UoM" 
                        value={item.uom} 
                        onChange={(e) => handleChange('uom', e.target.value)}
                        sx={{ my: 1 }}
                    >
                        <MenuItem value="kg">Kg</MenuItem>
                        <MenuItem value="Liter">Liter</MenuItem>
                        <MenuItem value="pcs">Pcs</MenuItem>
                    </TextField>
                    <TextField 
                        fullWidth 
                        label="Price"
                        type="number" 
                        value={item.price} 
                        onChange={(e) => handleChange('price', e.target.value)}
                        error={!!errors.price}
                        helperText={errors.price}
                        sx={{ my: 1 }}
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }} >{editItem ? 'Update Item' : 'Add Item'}</Button>
                </Box>
            </Modal>
        </>
    )

}

export default ItemModal