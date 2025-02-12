import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import Header from "../components/Header";

const recipe = [
    { name: 'Aren Sugar', qty: 15, uom: 'g' },
    { name: 'Milk', qty: 150, uom: 'ml' },
    { name: 'Ice Cube', qty: 20, uom: 'g' },
    { name: 'Plastic Cup', qty: 1, uom: 'pcs' },
    { name: 'Coffee Bean', qty: 20, uom: 'g' },
    { name: 'Mineral Water', qty: 50, uom: 'ml' }
]

const COGS = () => {
    const [inventory, setInventory] = useState([])
    const [cups, setCups] = useState(1)
    const [totalCost, setTotalCost] = useState(1)
    const [costDetails, setCostDetails] = useState([])

    useEffect(() => {
        const storedInventory = JSON.parse(localStorage.getItem('inventory')) || []
        setInventory(storedInventory)
    }, [])

    useEffect(() => {
        calculateCOGS()
    }, [cups, inventory])

    const calculateCOGS = () => {
        let cost = 0;
        let details = []

        recipe.forEach((ingredient) => {
        const item = inventory.find(i => i.name === ingredient.name);
        console.log(item)
        console.log(ingredient)
        if (item) {
            let baseQty;
            if (item.uom.includes('kg') || item.uom.includes('Liter')) {
            baseQty = 1000; // Konversi harga per gram/ml jika satuannya Kg atau Liter
            } else {
            baseQty = ingredient.qty; // Jika bukan Kg/Liter, gunakan jumlah unit
            }
            console.log('base qty: ' + baseQty)
            console.log('item price: ' + item.price)
            const pricePerUnit = item.price / baseQty;
            console.log('price per unit: ' + pricePerUnit)

            const totalIngredientCost = pricePerUnit * ingredient.qty * cups

            details.push({
                name: ingredient.name,
                qty: ingredient.qty,
                uom: ingredient.uom,
                pricePerUnit: pricePerUnit,
                totalCost: totalIngredientCost
            })

            cost += totalIngredientCost
        }
        })
        setCostDetails(details)
        setTotalCost(cost)
        console.log(totalCost)
    }

    return (
        <>
            <Header />
            <Container>
                <Paper>
                    <h2>COGS Calculation Iced Coffee</h2>
                    <TableContainer component={Paper} style={{ marginTop: 20 }}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>UoM</TableCell>
                            <TableCell>Price per Unit</TableCell>
                            <TableCell>Total Item Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {costDetails.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell>{item.uom}</TableCell>
                                <TableCell>Rp {Number(item.pricePerUnit).toLocaleString()}</TableCell>
                                <TableCell>Rp {Number(item.totalCost).toLocaleString()}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <p style={{ color: 'red', textAlign: 'end', marginRight: 15, fontSize: '0.775em' }}>*total item price (price per unit x quantity)</p>
                    <TextField 
                        fullWidth
                        label="Total Cups"
                        type="number"
                        value={cups}
                        onChange={(e) => {
                                const value = Number(e.target.value)
                                if (value >= 0) {
                                    setCups(value)
                                }
                            }}
                        sx={{ mt: 2 }}
                    />
                    <h3 style={{ paddingBottom: 15 }}>Total COGS: Rp {totalCost.toLocaleString()}</h3>
                </Paper>
            </Container>
            
        </>
    )

}

export default COGS