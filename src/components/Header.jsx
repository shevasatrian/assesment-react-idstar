import { AppBar, Toolbar, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
                    <Button color="inherit" component={Link} to="/cogs">COGS</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header