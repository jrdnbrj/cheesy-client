import { useEffect, useState, createRef } from 'react'
import { gql } from "@apollo/client"
import { useSelector } from 'react-redux'

import client from '../adapters/apolloClient'
import Modal from '../components/Modal'

import SquareLogo from '../assets/img/square-logo.png'


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

    // PayPal
    useEffect(() => {
        const modal = document.getElementById('modal-checkout')
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
                setModalOptions({
                    header: 'Checkout',
                    body: 'It seems that there was an error with the transaction, please try again.',
                })
                modal.style.display = 'block'
            },
            onCancel: function () {
                console.log('Cancelled')
                setModalOptions({
                    header: 'Checkout',
                    body: 'You have canceled the transaction. Not sure what you are doing? Get in touch with us.',
                })
                modal.style.display = 'block'
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


    const [modalOptions, setModalOptions] = useState({})
    // const [modalOptions, setModalOptions] = useState({})

    const cart = useSelector(state => state.cart)
    const subtotal = useSelector(state => state.subtotal)

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [suite, setSuite] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')

    const [name2, setName2] = useState('')
    const [lastName2, setLastName2] = useState('')
    const [phone2, setPhone2] = useState('')
    const [email2, setEmail2] = useState('')
    const [address2, setAddress2] = useState('')
    const [suite2, setSuite2] = useState('')
    const [city2, setCity2] = useState('')
    const [state2, setState2] = useState('')
    const [zipCode2, setZipCode2] = useState('')

    const check = createRef()

    const isChecked = () => {
        if (check.current.checked) {
            setName2(name); setLastName2(lastName)
            setPhone2(phone); setEmail2(email)
            setAddress2(address); setSuite2(suite)
            setCity2(city); setState2(state)
            setZipCode2(zipCode)
        } else {
            setName2(''); setLastName2('')
            setPhone2(''); setEmail2('')
            setAddress2(''); setSuite2('')
            setCity2(''); setState2('')
            setZipCode2('')
        }
    }

    const pay = e => {
        e.preventDefault()
        console.log('Form enviado')
    }

    return <>
        <Modal id="modal-checkout" {...modalOptions} />
        <section className="row" id="row-correction">
            <section className="col-lg-7 order-sm-2 order-lg-1 payment">
                <form onSubmit={pay}>
                    <section className="row" id="row-correction">
                        <section className="col-lg-6 shipping">
                            <span>Shipping Information</span>
                            <section className="contact-info">
                                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" type="text" required />
                                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" type="text" required />
                                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" type="text" required />
                                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
                                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" type="text" required />
                                <input value={suite} onChange={e => setSuite(e.target.value)} placeholder="Apt, suite" type="text" required />
                                <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" type="text" required />
                                <div className="row" id="row-correction">
                                    <div className="col-7 state">
                                        <input value={state} onChange={e => setState(e.target.value)} placeholder="State" type="text" required />
                                    </div>
                                    <div className="col-5 zip-code">
                                        <input value={zipCode} onChange={e => setZipCode(e.target.value)} placeholder="Zip Code" type="text" required />
                                    </div>
                                </div>
                            </section>
                        </section>
                        <section className="col-lg-6 billing">
                            <span>Billing Information</span>
                            <section className="contact-info">
                                <input value={name2} onChange={e => setName2(e.target.value)} placeholder="Name" type="text" required />
                                <input value={lastName2} onChange={e => setLastName2(e.target.value)} placeholder="Last Name" type="text" required />
                                <input value={phone2} onChange={e => setPhone2(e.target.value)} placeholder="Phone" type="text" required />
                                <input value={email2} onChange={e => setEmail2(e.target.value)} placeholder="Email" type="email" required />
                                <input value={address2} onChange={e => setAddress2(e.target.value)} placeholder="Address" type="text" required />
                                <input value={suite2} onChange={e => setSuite2(e.target.value)} placeholder="Apt, suite" type="text" required />
                                <input value={city2} onChange={e => setCity2(e.target.value)} placeholder="City" type="text" required />
                                <div className="row" id="row-correction">
                                    <div className="col-7 state">
                                        <input value={state2} onChange={e => setState2(e.target.value)} placeholder="State" type="text" required />
                                    </div>
                                    <div className="col-5 zip-code">
                                        <input value={zipCode2} onChange={e => setZipCode2(e.target.value)} placeholder="Zip Code" type="text" required />
                                    </div>
                                </div>
                            </section>
                        </section>
                    </section>
                    <div className="form-check same-as">
                        <input className="form-check-input" ref={check} type="checkbox" id="check" onChange={isChecked} />
                        <label className="form-check-label" htmlFor="check">
                            Billing Addres same as Shipping Address
                        </label>
                    </div>
                    <span>Payment Information</span>
                    <section className="square">
                        <div id="card-container"></div>
                        <button className="square-pay" id="card-button" type="button">
                            <img src={SquareLogo} alt="Square logo" />
                            <span>Pay</span>
                        </button>
                    </section>
                </form>
                <span className="or">or</span>
                <div id="paypal-button"></div>
            </section>
            <section className="col-lg-5 order-sm-1 order-lg-2 cart">
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
                                    <p>price: {item.total.toFixed(2)}</p>
                                </> :
                                <>
                                    <span>{item.name}</span>
                                    {item.choose3.map(smoothie => {
                                        return <p key={smoothie}>
                                            {smoothie[1] !== 0 ? `${smoothie[0]}x${smoothie[1]}` : ''}
                                        </p>
                                    })}
                                    <p>{item.buyOnce ? ' Once' : ` Club ${item.joinClub}month`}</p>
                                    {/* <p>amount: {item.amount}</p> */}
                                    <p>amount: {item.amount}</p>
                                    <p>price: {item.total.toFixed(2)}</p>
                                </>
                            }
                        </section>
                    </section>
                })}
                <section className="receipt">
                    <div>
                        <span>Subtotal</span>
                        <span>$ {parseFloat(subtotal).toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Promo Code</span>
                        <span>-$ 10</span>
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
                        <span>$ {parseFloat(subtotal).toFixed(2)}</span>
                    </div>
                </section>
            </section>
        </section>
    </>
}

export default Checkout
