import { useLocation } from "react-router-dom";

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'


const Layout = ({ children }) => {
    
    const location = useLocation()
    
    const pathsWithoutFooter = [
        '/contact',
        '/checkout',
        '/admin'
    ]

    return <>
        <NavBar />
        <Cart />
        {children}
        { !pathsWithoutFooter.includes(location.pathname) && <Footer /> }
    </>
}

export default Layout
