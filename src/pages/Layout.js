import { useLocation } from "react-router-dom";

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'


const Layout = ({ children }) => {
    
    const location = useLocation()
    
    return <>
        <NavBar />
        <Cart />
        {children}
        {   
            location.pathname === '/contact' &&
            location.pathname === '/checkout' &&
            location.pathname === '/admin' &&
            <Footer />
        }
    </>
}

export default Layout
