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
            shortDescription
            ingredients
            price
            path
        }
    }
`

const Cart = () => {

    const { data } = useQuery(GET_PRODUCTS)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const subtotal = useSelector(state => state.subtotal)

    console.log('CART:', cart)

    const updateItem = (i, amount, price) => {
        if (cart[i].amount < 1  && amount < 0) return

        cart[i].amount += amount
        cart[i].total += parseFloat(price)

        dispatch({ type: 'SET_CART', payload: [...cart] })
    }

    const removeItem = i => {
        cart.splice(i, 1)
        dispatch({ type: 'SET_CART', payload: [...cart] })
    } 

    const getSubtotal = () => {
        const prices = cart.map(item => item.total)
        const subtotal = prices.reduce((a, b) => a + b, 0)
        dispatch({ type: 'SET_SUBTOTAL', subtotal: subtotal.toFixed(2) })
    }

    // eslint-disable-next-line
    useEffect(getSubtotal, [cart])

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
                        return <section key={i}>
                            <div className="cart-divider"></div>
                            <section className="row" id="row-correction">
                                <section className="col-lg-4 col-sm-4 col-4 my-auto">
                                    <img src={item.image} className="image-cart" alt="Mozarella in Shoping Cart" />
                                </section>
                                <section className="col-lg-6 col-sm-6 col-6 cart-description">
                                    <p>{item.name}</p>
                                    { item.path !== '/fruits' ?
                                        <p className="item-description">
                                            {item.bundleUp}-pk.
                                            {item.buyOnce ? ' Once' : ` Club${item.joinClub}mo`}
                                        </p> :
                                        <>
                                            <p className="item-description">
                                                Bittes: <span className="choose-1-cart">{item.choose1}</span>
                                            </p>
                                               <p className="item-description">
                                                    Fruit:
                                                    {item.choose3.map(smoothie => {
                                                            return <span className="flavor-cart"> {smoothie[1] !== 0 ? `${smoothie[0]}x${smoothie[1]}` : ''}, </span>
                                                    })}
                                                </p>
                                            <p className="item-description">
                                                {item.buyOnce ? ' Once' : ` Club${item.joinClub}mo`}
                                            </p>
                                        </>
                                    }
                                    <section>
                                        <button onClick={() => updateItem(i, -1, -item.price)}>-</button>
                                        <input value={item.amount} type="number" className="cart-input-amount" disabled />
                                        <button onClick={() => updateItem(i, 1, item.price)}>+</button>
                                        <input value={item.total && item.total.toFixed(2)} type="number" className="cart-input-price" disabled />
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
                    <span className="subtotal-cart"><strong>Subtotal:</strong> ${parseFloat(subtotal).toFixed(2)}</span>
                </section>
                <section className="checkout-cart">
                    <Link to="/checkout" className={`checkout-button ${subtotal <= 0 ? 'checkout-disabled' : '' }`}>Checkout</Link>
                </section>
            </section>
        </div>
    </>
}

export default Cart