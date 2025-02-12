import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const InventoryContext = createContext();

const defaultData = [
    { id: 1, name: "Aren Sugar", qty: 1, uom: "kg", price: 60000 },
    { id: 2, name: "Milk", qty: 1, uom: "Liter", price: 30000 },
    { id: 3, name: "Ice Cube", qty: 1, uom: "kg", price: 15000 },
    { id: 4, name: "Plastic Cup", qty: 10, uom: "pcs", price: 5000 },
    { id: 5, name: "Coffee Bean", qty: 1, uom: "kg", price: 100000 },
    { id: 6, name: "Mineral Water", qty: 1, uom: "Liter", price: 5000 }
]

// eslint-disable-next-line react/prop-types
export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        const storedInventory = JSON.parse(localStorage.getItem("inventory"));
        if (storedInventory) {
            setInventory(storedInventory);
        } else {
            localStorage.setItem("inventory", JSON.stringify(defaultData));
            setInventory(defaultData);
        }
    }, [])

    const handleSave = (item, editItem, setModalOpen) => {
        const updatedInventory = editItem
            ? inventory.map((i) => (i.id === editItem.id ? { ...editItem, ...item } : i))
            : [...inventory, { ...item, id: inventory.length + 1 }]

        setInventory(updatedInventory)
        localStorage.setItem("inventory", JSON.stringify(updatedInventory))
        setModalOpen(false)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedInventory = inventory.filter((item) => item.id !== id);
                setInventory(updatedInventory);
                localStorage.setItem("inventory", JSON.stringify(updatedInventory));
                Swal.fire("Deleted", "Item has been deleted.", "success");
            }
        })
    }

    return (
        <InventoryContext.Provider value={{ inventory, handleSave, handleDelete }}>
            {children}
        </InventoryContext.Provider>
    )
}

export const useInventory = () => useContext(InventoryContext);
