import { Link } from 'react-router-dom'

import hamburguerIcon from '../assets/img/hamburguer-icon.png';
import mediumLogo from '../assets/img/medium-logo.png'
import smallLogo from '../assets/img/small-logo.png'
import cart from '../assets/img/cart.png'


const Header = () => {
    return <nav className="navbar navbar-expand-lg navbar-light navbar-bg">
        <div className="container-fluid">
            <button className="navbar-toggler" id="hamburguer-btn" type="button" data-bs-toggle="collapse" data-bs-target="#nav-tog" aria-controls="nav-tog" aria-expanded="false" aria-label="Toggle navigation">
                <img src={hamburguerIcon} className="hamburguer-icon ms-2 me-5" alt="hamburguer-icon" />
            </button>
            <img src={smallLogo} className="small-logo my-2" alt="Cheesy Bittes Logo" />
            <div className="collapse navbar-collapse" id="nav-tog">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link mx-5" id="item-nav" to="/">Our Family</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link ms-5" id="item-nav" to="/">Products</Link>
                    </li>
                </ul>
                <img src={mediumLogo} className="medium-logo my-2 mx-2" alt="Cheesy Bittes Logo" />
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link ms-5" id="item-nav" to="/">Contact us</Link>
                    </li>
                </ul>
            </div>
            <img src={cart} className="cart-logo me-2 ms-5 mb-1" alt="Cart Logo" />
        </div>
    </nav>
}

export default Header