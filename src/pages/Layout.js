import { useLocation } from "react-router-dom";

import Header from '../components/Header'
import Footer from '../components/Footer'


const Layout = ({ children }) => {
    return <>
        <Header />
        {children}
        {useLocation().pathname !== '/contact' ? <Footer /> : null}
    </>
}

export default Layout