import { useLocation } from "react-router-dom";

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'


const Layout = ({ children }) => {
    return <>
        <NavBar />
        {children}
        {useLocation().pathname !== '/contact' ? <Footer /> : null}
    </>
}

export default Layout