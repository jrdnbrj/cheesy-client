import { Link } from 'react-router-dom'

import background from '../assets/img/cart-background.png'
import mozzarella from '../assets/img/products-mozzarella.png'
import cheddar from '../assets/img/products-cheddar.png'
import pepperJack from '../assets/img/products-pepperjack.png'

const Cart = () => {
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
                        <section className="row">
                            <section className="col-lg-4">
                                <img src={mozzarella} className="mozzarella-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 cart-description">
                                <p>Mozzarella</p>
                                <section>
                                    <button className="decrease">-</button>
                                    <input type="number" className="cart-input-amount" />
                                    <button className="increase">+</button>
                                    <input type="number" className="cart-input-price" />
                                </section>
                            </section>
                            <section className="col-lg-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row">
                            <section className="col-lg-4">
                                <img src={cheddar} className="mozzarella-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 cart-description">
                                <p>Cheddar</p>
                                <section>
                                    <button className="decrease">-</button>
                                    <input type="number" className="cart-input-amount" />
                                    <button className="increase">+</button>
                                    <input type="number" className="cart-input-price" />
                                </section>
                            </section>
                            <section className="col-lg-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row">
                            <section className="col-lg-4">
                                <img src={pepperJack} className="mozzarella-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button className="decrease">-</button>
                                    <input type="number" className="cart-input-amount" />
                                    <button className="increase">+</button>
                                    <input type="number" className="cart-input-price" />
                                </section>
                            </section>
                            <section className="col-lg-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row">
                            <section className="col-lg-4">
                                <img src={pepperJack} className="mozzarella-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button className="decrease">-</button>
                                    <input type="number" className="cart-input-amount" />
                                    <button className="increase">+</button>
                                    <input type="number" className="cart-input-price" />
                                </section>
                            </section>
                            <section className="col-lg-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row">
                            <section className="col-lg-4">
                                <img src={pepperJack} className="mozzarella-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button className="decrease">-</button>
                                    <input type="number" className="cart-input-amount" />
                                    <button className="increase">+</button>
                                    <input type="number" className="cart-input-price" />
                                </section>
                            </section>
                            <section className="col-lg-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                    <section>
                        <div className="cart-divider"></div>
                        <section className="row">
                            <section className="col-lg-4">
                                <img src={pepperJack} className="mozzarella-cart" alt="Mozarella in Shoping Cart" />
                            </section>
                            <section className="col-lg-6 cart-description">
                                <p>Pepper Jack</p>
                                <section>
                                    <button className="decrease">-</button>
                                    <input type="number" className="cart-input-amount" />
                                    <button className="increase">+</button>
                                    <input type="number" className="cart-input-price" />
                                </section>
                            </section>
                            <section className="col-lg-2 pe-2">
                                <button className="remove-item">x</button>
                            </section>
                        </section>
                    </section>
                </section>

                <section className="sticky">
                    <section className="subtotal-cart-container">
                        <span className="subtotal-cart"><stron>Subtotal:</stron> $1.000</span>
                    </section>
                    <section className="checkout-cart">
                        <Link to="/checkout" className="checkout-button">Checkout</Link>
                    </section>
                </section>
            </div>
        </div>
    </>
}

export default Cart