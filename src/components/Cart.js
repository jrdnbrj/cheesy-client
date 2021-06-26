import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"

import background from '../assets/img/cart-background.png'


const GET_PRODUCTS = gql`
    query {
        getProducts {
            name
            images
            description
            ingredients
            price
        }
    }
`

const Cart = () => {

    const { data } = useQuery(GET_PRODUCTS)
    data && console.log('Products:', data.getProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: 'SET_PRODUCTS', payload: data && data.getProducts })
    }, [data, dispatch])

    return <>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <img src={background} className="cart-background" alt="Cart" />
            <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Cart</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">x</button>
            </div>
            <div className="offcanvas-body">
                <section className="cart-products">
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row" id="row-correction">
                            <section className="col-lg-4 col-sm-4 col-4">
                                <img src={`${data && data.getProducts[0].images[0]}`} className="image-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button>-</button>
                                    <input type="number" className="cart-input-amount" disabled />
                                    <button>+</button>
                                    <input type="number" className="cart-input-price" disabled />
                                </section>
                            </section>
                            <section className="col-lg-2 col-sm-2 col-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row" id="row-correction">
                            <section className="col-lg-4 col-sm-4 col-4">
                                <img src={`${data && data.getProducts[0].images[0]}`} className="image-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button>-</button>
                                    <input type="number" className="cart-input-amount" disabled />
                                    <button>+</button>
                                    <input type="number" className="cart-input-price" disabled />
                                </section>
                            </section>
                            <section className="col-lg-2 col-sm-2 col-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row" id="row-correction">
                            <section className="col-lg-4 col-sm-4 col-4">
                                <img src={`${data && data.getProducts[0].images[0]}`} className="image-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button>-</button>
                                    <input type="number" className="cart-input-amount" disabled />
                                    <button>+</button>
                                    <input type="number" className="cart-input-price" disabled />
                                </section>
                            </section>
                            <section className="col-lg-2 col-sm-2 col-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row" id="row-correction">
                            <section className="col-lg-4 col-sm-4 col-4">
                                <img src={`${data && data.getProducts[0].images[0]}`} className="image-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button>-</button>
                                    <input type="number" className="cart-input-amount" disabled />
                                    <button>+</button>
                                    <input type="number" className="cart-input-price" disabled />
                                </section>
                            </section>
                            <section className="col-lg-2 col-sm-2 col-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row" id="row-correction">
                            <section className="col-lg-4 col-sm-4 col-4">
                                <img src={`${data && data.getProducts[0].images[0]}`} className="image-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button>-</button>
                                    <input type="number" className="cart-input-amount" disabled />
                                    <button>+</button>
                                    <input type="number" className="cart-input-price" disabled />
                                </section>
                            </section>
                            <section className="col-lg-2 col-sm-2 col-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row" id="row-correction">
                            <section className="col-lg-4 col-sm-4 col-4">
                                <img src={`${data && data.getProducts[0].images[0]}`} className="image-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button>-</button>
                                    <input type="number" className="cart-input-amount" disabled />
                                    <button>+</button>
                                    <input type="number" className="cart-input-price" disabled />
                                </section>
                            </section>
                            <section className="col-lg-2 col-sm-2 col-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                </section>

            </div>
            <section className="sticky">
                <section className="subtotal-cart-container">
                    <span className="subtotal-cart"><strong>Subtotal:</strong> $24.20</span>
                </section>
                <section className="checkout-cart">
                    <Link to="/checkout" className="checkout-button">Checkout</Link>
                </section>
            </section>
        </div>
    </>
}

export default Cart