// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"
// import { useDispatch } from 'react-redux'

import background1 from '../assets/img/family-background-2.png'
import background2 from '../assets/img/products-background-2.png'
import background3 from '../assets/img/products-background-3.png'
import header from '../assets/img/products-header.jpg'
import logo from '../assets/img/logo.png'
import dot1 from '../assets/img/white-dot1.png'
import dot2 from '../assets/img/white-dot2.png'
import dot3 from '../assets/img/white-dot3.png'

import mozzarella from '../assets/img/products-mozzarella.png'
import cheddar from '../assets/img/products-cheddar.png'
import pepperJack from '../assets/img/products-pepperjack.png'
import mix from '../assets/img/products-mix.png'
import bittesFruits from '../assets/img/product-bittes-fruits.png'

import oven from '../assets/img/oven.png'
import airFryer from '../assets/img/air-fryer.png'
import important from '../assets/img/important.png'


const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
            name
            description
            ingredients
            price
        }
    }
`

const Mozzarella = () => {

    // const dispatch = useDispatch()
    let { loading, data } = useQuery(GET_PRODUCTS)

    if (data) data = data.getProducts

    // useEffect(() => {
    //     console.log('products:', data)
    //     dispatch({ type: 'SET_PRODUCTS', payload: data })
    // }, [data, dispatch])

    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={dot1} className="products-dot" id="products-dot-1" alt="Dot 1" />
        <img src={dot2} className="products-dot" id="products-dot-2" alt="Dot 2" />
        <img src={dot3} className="products-dot" id="products-dot-3" alt="Dot 3" />
        <img src={background1} className="products-back1" alt="Products Background" />
        { loading ? <p>Cargando Información de Productos</p> : 
            <section>
                <section className="row product-list" id="row-correction">
                    <section className="col-lg-5 col-sm-5 col-5 text-end">
                        <img src={mozzarella} className="product-img" alt="Cheddar" />
                    </section>
                    <section className="col-lg-5 col-sm-7 col-7 product-text">
                        <Link to="/mozzarella" style={{ textDecoration: 'none' }}><h5>{data[0].name}</h5></Link>
                        <p>{data[0].description}</p>
                        <Link to="/mozzarella"><button>Get Some</button></Link>
                    </section>
                    <section className="col col-hidden"></section>
                </section>
                <section className="row product-list" id="row-correction">
                    <section className="col col-hidden"></section>
                    <section className="col-lg-5 col-sm-5 col-5 text-end">
                        <img src={cheddar} className="product-img" alt="Cheddar" />
                    </section>
                    <section className="col-lg-5 col-sm-7 col-7 product-text">
                        <Link to="/cheddar" style={{ textDecoration: 'none' }}><h5>{data[1].name}</h5></Link>
                        <p>{data[1].description}</p>
                        <Link to="/cheddar"><button>Get Some</button></Link>
                    </section>
                </section>
                <section className="row product-list" id="row-correction">
                    <section className="col-lg-5 col-sm-5 col-5 text-end">
                        <img src={pepperJack} className="product-img" alt="Cheddar" />
                    </section>
                    <section className="col-lg-5 col-sm-7 col-7 product-text">
                        <Link to="/pepperjack" style={{ textDecoration: 'none' }}><h5>{data[2].name}</h5></Link>
                        <p>{data[2].description}</p>
                        <Link to="/pepperjack"><button>Get Some</button></Link>
                    </section>
                    <section className="col col-hidden"></section>
                </section>
                <section className="row product-list pb-5" id="row-correction">
                    <section className="col col-hidden"></section>
                    <section className="col-lg-5 col-sm-5 col-5 text-end">
                        <img src={mix} className="product-img-2" alt="Cheddar" />
                    </section>
                    <section className="col-lg-5 col-sm-7 col-7 product-text">
                        <Link to="/mix" style={{ textDecoration: 'none' }}><h5>{data[3].name}</h5></Link>
                        <p>{data[3].description}</p>
                        <Link to="/mix"><button>Get Some</button></Link>
                    </section>
                </section>
                <section className="row product-list" id="row-correction">
                    <section className="col-lg-5 col-sm-5 col-5 text-end">
                        <img src={bittesFruits} className="product-img-2" alt="Cheddar" />
                    </section>
                    <section className="col-lg-5 col-sm-7 col-7 product-text">
                        <Link to="/fruits" style={{ textDecoration: 'none' }}><h5>BITTES & FRUIT</h5></Link>
                        <p>Let’s get the party started! Our Cheesy Bittes and natural fruit pulp are made for each other. Compliment your favorite snack with fresh juice, smoothies, cocktails, or desserts.</p>
                        <Link to="/fruits"><button>Get Some</button></Link>
                    </section>
                    <section className="col col-hidden"></section>
                </section>
            </section>
        }
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

export default Mozzarella
