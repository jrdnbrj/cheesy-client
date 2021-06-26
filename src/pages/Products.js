import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import background1 from '../assets/img/family-background-2.png'
import background2 from '../assets/img/products-background-2.png'
import background3 from '../assets/img/products-background-3.png'
import header from '../assets/img/products-header.jpg'
import logo from '../assets/img/logo.png'
import dot1 from '../assets/img/white-dot1.png'
import dot2 from '../assets/img/white-dot2.png'
import dot3 from '../assets/img/white-dot3.png'

import oven from '../assets/img/oven.png'
import airFryer from '../assets/img/air-fryer.png'
import important from '../assets/img/important.png'


const Product = () => {

    const products = useSelector(state => state.products)

    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={dot1} className="products-dot" id="products-dot-1" alt="Dot 1" />
        <img src={dot2} className="products-dot" id="products-dot-2" alt="Dot 2" />
        <img src={dot3} className="products-dot" id="products-dot-3" alt="Dot 3" />
        <img src={background1} className="products-back1" alt="Products Background" />
        
        <section className="row product-list" id="row-correction">
            <section className="col-lg-5 col-sm-5 col-5 text-end">
                <img src={`${products && products[0] && products[0].images[0]}`} className="product-img" alt="Mozzarella" />
            </section>
            <section className="col-lg-5 col-sm-7 col-7 product-text">
                <Link to="/mozzarella" style={{ textDecoration: 'none' }}>
                    <h5>{products && products[0] && products[0].name}</h5>
                </Link>
                <p>{products && products[0] && products[0].description}</p>
                <Link to="/mozzarella"><button>Get Some</button></Link>
            </section>
            <section className="col col-hidden"></section>
        </section>

        <section className="row product-list" id="row-correction">
            <section className="col col-hidden"></section>
            <section className="col-lg-5 col-sm-5 col-5 text-end">
                <img src={`${products && products[0] && products[1].images[0]}`} className="product-img" alt="Cheddar" />
            </section>
            <section className="col-lg-5 col-sm-7 col-7 product-text">
                <Link to="/cheddar" style={{ textDecoration: 'none' }}>
                    <h5>{products && products[0] && products[1].name}</h5>
                </Link>
                <p>{products && products[0] && products[1].description}</p>
                <Link to="/cheddar"><button>Get Some</button></Link>
            </section>
        </section>

        <section className="row product-list" id="row-correction">
            <section className="col-lg-5 col-sm-5 col-5 text-end">
                <img src={`${products && products[0] && products[2].images[0]}`} className="product-img" alt="Pepper Jack" />
            </section>
            <section className="col-lg-5 col-sm-7 col-7 product-text">
                <Link to="/pepperjack" style={{ textDecoration: 'none' }}>
                    <h5>{products && products[0] && products[2].name}</h5>
                </Link>
                <p>{products && products[0] && products[2].description}</p>
                <Link to="/pepperjack"><button>Get Some</button></Link>
            </section>
            <section className="col col-hidden"></section>
        </section>

        <section className="row product-list pb-5" id="row-correction">
            <section className="col col-hidden"></section>
            <section className="col-lg-5 col-sm-5 col-5 text-end">
                <img src={`${products && products[0] && products[3].images[0]}`} className="product-img-2" alt="Mix Them Up!" />
            </section>
            <section className="col-lg-5 col-sm-7 col-7 product-text">
                <Link to="/mix" style={{ textDecoration: 'none' }}>
                    <h5>{products && products[0] && products[3].name}</h5>
                </Link>
                <p>{products && products[0] && products[3].description}</p>
                <Link to="/mix"><button>Get Some</button></Link>
            </section>
        </section>

        <section className="row product-list" id="row-correction">
            <section className="col-lg-5 col-sm-5 col-5 text-end">
                <img src={`${products && products[0] && products[4].images[0]}`} className="product-img-2" alt="Bittes & Fruits" />
            </section>
            <section className="col-lg-5 col-sm-7 col-7 product-text">
                <Link to="/fruits" style={{ textDecoration: 'none' }}>
                    <h5>{products && products[0] && products[4].name}</h5>
                </Link>
                <p>{products && products[0] && products[4].description}</p>
                <Link to="/fruits"><button>Get Some</button></Link>
            </section>
            <section className="col col-hidden"></section>
        </section>

        <img src={background2} className="product-back" alt="Products Background" />
        <section className="green text-center">
            <h4>UNBOX, BAKE, ENJOY!</h4>
            <section className="row mt-5" id="row-correction">
                <section className="col-lg-4 px-4 instructions">
                    <img src={oven} className="oven" alt="Oven" />
                    <h5>Conventional Oven or Toaster Oven</h5>
                    <li className="bullet">Pre-heat oven to 400°F.</li>
                    <li className="bullet">Place frozen cheese bread balls onto parchment paper, about 1 inch apart.</li>
                    <li className="bullet">Bake for 20 - 25 minutes or until golden brown.</li>
                    Enjoy warm!
                </section>
                <section className="col-lg-4 px-4 instructions">
                    <img src={airFryer} className="air-fryer" alt="Air Fryer" />
                    <h5>Air Fryer</h5>
                    <li className="bullet green-padding">Place frozen cheese bread balls onto parchment paper, about 1 inch apart.</li>
                    <li className="bullet">Set to 375°F fro 12 - 15 minutes or until golden brown.</li>
                    Enjoy warm!
                </section>
                <section className="col-lg-4 px-4 instructions">
                    <img src={important} className="important" alt="Important" />
                    <h5>Important</h5>
                    <li className="bullet green-padding">Do not microwave</li>
                    <li className="bullet">Do not spray or grease</li>
                    <li className="bullet">Keep frozen until ready to bake</li>
                    Do not allow to thaw
                </section>
            </section>
        </section>
        <img src={background3} className="product-back-2" alt="Products Background" />
    </>
}

export default Product
