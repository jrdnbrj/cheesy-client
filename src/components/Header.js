import { Link } from 'react-router-dom'

import mediumLogo from '../assets/img/medium-logo.png'
import smallLogo from '../assets/img/small-logo.png'
import cart from '../assets/img/cart.png'


const Header = () => {
    return <nav className="navbar navbar-expand-lg navbar-light navbar-bg">
        <div className="container-fluid">
            <button className="navbar-toggler" id="hamburguer-btn" type="button" data-bs-toggle="collapse" data-bs-target="#nav-tog" aria-controls="nav-tog" aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi-list hamburguer-icon" ></i>
            </button>
            <img src={smallLogo} className="small-logo" alt="Cheesy Bittes Logo" />
            <img src={cart} className="cart-logo-2" id="item-nav" alt="Cart Logo" />
            <div className="collapse navbar-collapse" id="nav-tog">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item my-auto">
                        <Link className="nav-link" id="item-nav" to="/">Our Family</Link>
                    </li>
                    <li className="nav-item my-auto">
                        <Link className="nav-link" id="item-nav" to="/">Products</Link>
                    </li>
                    <li className="nav-item mx-5">
                        <img src={mediumLogo} className="medium-logo my-3 mx-5" alt="Cheesy Bittes Logo" />
                    </li>
                    <li className="nav-item my-auto">
                        <Link className="nav-link" id="item-nav" to="/">Contact us</Link>
                    </li>
                    <li className="nav-item my-auto">
                        <img src={cart} className="cart-logo" id="item-nav" alt="Cart Logo" />
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}

export default Header