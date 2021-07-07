import { useEffect } from 'react'
import { gql } from "@apollo/client"
import { useSelector } from 'react-redux'
import client from '../adapters/apolloClient'


const CREATE_ORDER = gql`
    query {
        createOrder
    }

`

const CAPTURE_ORDER = gql`
    query ($order_id: String!) {
        captureOrder(orderId: $order_id)
    }
`

const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const subtotal = useSelector(state => state.subtotal)


    // PayPal
    useEffect(() => {
        window.paypal.Buttons({
            style: {
                color: 'gold',
                shape: 'pill',
                size: 'responsive',
                layout: 'horizontal',
                label: 'checkout',
                // tagline: false
            },
            createOrder: function(data, actions) {
                console.log('Creando Orden')
                return client.query({ query: CREATE_ORDER }).then(({ data }) => data.createOrder)
            },
            onApprove: function(data, actions) {
                console.log('approved')
                return client.query({ query: CAPTURE_ORDER, variables: { order_id: data.orderID } })
                    .then(data => {
                        return console.log('Data Captured:', data.data.captureOrder)
                    })
            },
            onError: function(error) {
                console.log('Error:', error)
                // alert('It seems that there was an error with the transaction, please try again or contact us on the Customer Support.')
            },
            onCancel: function () {
                console.log('Cancelled')
                // alert('You have canceled the transaction. Not sure what you are doing? Get in touch with us on the Customer Support.')
            },
        }).render("#paypal-button");
    }, [])

    // Square
    useEffect(() => {
        const main = async () => {
            const payments = window.Square.payments('sandbox-sq0idb-QrUq90laeC8jv6V6en0VyA', 'LWB5K8RGJYJSY');
            const card = await payments.card();
            await card.attach('#card-container');

            const eventHandler = async event => {
                event.preventDefault();
                try {
                    const result = await card.tokenize();
                    if (result.status === 'OK') {
                        console.log(`Payment token is: ${result.token}`);
                    }
                } catch (e) {
                    console.error(e);
                }
            };

            const cardButton = document.getElementById('card-button');
            cardButton.addEventListener('click', eventHandler);
        }
        main()
    }, [])

    return <section className="row" id="row-correction">
        <section className="col-lg-7 payment">
            <span>Contact Information</span>
            <section className="contact-info">
                <input placeholder="Name" type="text" />
                <input placeholder="Last Name" type="text" />
                <input placeholder="Phone" type="text" />
                <input placeholder="Email" type="email" />
                <input placeholder="Address" type="text" />
                <input placeholder="Apt, suite" type="text" />
                <input placeholder="City" type="text" />
            </section>
            <span>Payment</span>
            <section className="square">
                <div id="card-container"></div>
                <button className="square-pay" id="card-button" type="button">Pay</button>
            </section>

            <div id="paypal-button"></div>
        </section>
        <section className="col-lg-5 cart">
            <span className="my-cart">My Cart</span>
            { cart.map((item, i) => {
                return <section className="row cart-item" id="row-correction" key={i}>
                    <section className="col-lg-5">
                        <img src={item.image} alt="Cart Item" />
                    </section>
                    <section className="col-lg-7">
                        { item.path !== '/fruits' ?
                            <>
                                <span>{item.name}</span>
                                <p>{item.bundleUp}-pack.</p>
                                <p>{item.buyOnce ? ' Once' : ` Club ${item.joinClub}month`}</p>
                                <p>amount: {item.amount}</p>
                                <p>price: {item.price.toFixed(2)}</p>
                            </> :
                            <>
                                <span>{item.name}</span>
                                {item.choose3.map(smoothie => {
                                    return <p key={smoothie}>
                                        {smoothie[1] !== 0 ? `${smoothie[0]}x${smoothie[1]}` : ''}
                                    </p>
                                })}
                                <p>{item.buyOnce ? ' Once' : ` Club ${item.joinClub}month`}</p>
                                <p>amount: {item.amount}</p>
                                <p>price: {item.price.toFixed(2)}</p>
                            </>
                        }
                    </section>
                </section>
            })}
            <section className="receipt">
                <div>
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>
                <div>
                    <span>Estimated Shipping</span>
                    <span></span>
                </div>
                <div>
                    <span>Estimated Tax</span>
                    <span></span>
                </div>
                <div>
                    <span>Total</span>
                    <span>${subtotal}</span>
                </div>
            </section>
        </section>
    </section>
}

export default Checkout