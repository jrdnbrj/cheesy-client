import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
            path
        }
    }
`

const Cart = () => {

    const { data } = useQuery(GET_PRODUCTS)
    const dispatch = useDispatch()
    let cart = useSelector(state => state.cart)

    let mozzarella = {}
    let cheddar = {}
    let pepperJack = {}
    let mix = {}

    const arrayToProducts = () => {
        // console.log('Products:', data.getProducts)
        mozzarella = data.getProducts[0]
        cheddar = data.getProducts[1]
        pepperJack = data.getProducts[2]
        mix = data.getProducts[3]
    }

    data && arrayToProducts()

    console.log('CART:', cart)

    const updateItem = (i, _amount, productPrice) => {
        if (cart[i].amount < 1  && _amount < 0) return

        cart[i].amount += _amount
        cart[i].price += parseFloat(productPrice)

        dispatch({ type: 'SET_CART', payload: [...cart] })
    }

    const removeItem = i => {
        cart.splice(i, 1)
        dispatch({ type: 'SET_CART', payload: [...cart] })
    } 

    const getTotal = () => {
        const prices = cart.map(item => item.price)
        const total = prices.reduce((a, b) => a + b, 0)
        return total.toFixed(2)
    }

    useEffect(() => {
        dispatch({ type: 'SET_PRODUCTS', payload: data && data.getProducts })
        // eslint-disable-next-line
    }, [data])

    return <>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <img src={background} className="cart-background" alt="Cart" />
            <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Cart</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">x</button>
            </div>
            <div className="offcanvas-body">
                <section className="cart-products">
                    {cart.map((item, i) => {
                        const product = item.path === '/mozzarella' ? mozzarella : 
                                        item.path === '/cheddar' ? cheddar :
                                        item.path === '/pepperjack' ? pepperJack :
                                        item.path === '/mix' ? mix : {}
                        return <section key={i}>
                            <div className="cart-divider"></div>
                            <section className="row" id="row-correction">
                                <section className="col-lg-4 col-sm-4 col-4">
                                    <img src={data && product.images[0]} className="image-cart" alt="Mozarella in Shoping Cart" />
                                </section>
                                <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                    <p>{product.name}</p>
                                    <section>
                                        <button onClick={() => updateItem(i, -1, -product.price)}>-</button>
                                        <input value={item.amount} type="number" className="cart-input-amount" disabled />
                                        <button onClick={() => updateItem(i, 1, product.price)}>+</button>
                                        <input value={item.price && item.price.toFixed(2)} type="number" className="cart-input-price" disabled />
                                    </section>
                                </section>
                                <section className="col-lg-2 col-sm-2 col-2">
                                    <button className="remove-item" onClick={() => removeItem(i)}>x</button>
                                </section>
                            </section>
                        </section>
                    })}
                </section>
            </div>
            <section className="sticky">
                <section className="subtotal-cart-container">
                    <span className="subtotal-cart"><strong>Subtotal:</strong> ${getTotal()}</span>
                </section>
                <section className="checkout-cart">
                    <Link to="/checkout" className={`checkout-button ${getTotal() <= 0 ? 'checkout-disabled' : '' }`}>Checkout</Link>
                </section>
            </section>
        </div>
    </>
}

export default Cart