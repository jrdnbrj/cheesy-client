import { useLocation } from "react-router-dom";

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'


const Layout = ({ children }) => {
    return <>
        <NavBar />
        <Cart />
        {children}
        {useLocation().pathname !== '/contact' ? <Footer /> : null}
    </>
}

export default Layout
