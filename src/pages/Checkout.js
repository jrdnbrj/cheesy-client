import { useEffect, useState, createRef } from 'react'
import { gql, useMutation } from "@apollo/client"
import { useSelector } from 'react-redux'

import client from '../adapters/apolloClient'
import Modal from '../components/Modal'

import SquareLogo from '../assets/img/square-logo.png'


const CREATE_ORDER = gql`
    query ($amount: String!) {
        createOrder(amount: $amount)
    }

`

const CAPTURE_ORDER = gql`
    query ($order_id: String!, $cart: [CartType]!) {
        captureOrder(orderId: $order_id, cart: $cart)
    }
`

const CREATE_PAYMENT = gql`
    query ($paymentToken: String!, $amount: String!) {
        createPayment(paymentToken: $paymentToken, amount: $amount)
    }
`

const CREATE_CHECKOUT_CONTACT = gql`
    mutation ($billingInfo: CheckoutInfoInputType, $shippingInfo: CheckoutInfoInputType) {
        createCheckoutContact(billingInfo: $billingInfo, shippingInfo: $shippingInfo) {
            response
        }
    }
`

const Checkout = () => {

    const [showPayPal, setShowPayPal] = useState(true)

    const [modalOptions, setModalOptions] = useState({})

    const cart = useSelector(state => state.cart)
    const subtotal = useSelector(state => state.subtotal)

    const [total, setTotal] = useState(0)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [suite, setSuite] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')

    const [name2, setName2] = useState('')
    const [phone2, setPhone2] = useState('')
    const [email2, setEmail2] = useState('')
    const [address2, setAddress2] = useState('')
    const [suite2, setSuite2] = useState('')
    const [city2, setCity2] = useState('')
    const [state2, setState2] = useState('')
    const [zipCode2, setZipCode2] = useState('')

    const check = createRef()

    const [createCheckoutContact] = useMutation(CREATE_CHECKOUT_CONTACT)

    // PayPal
    useEffect(() => {
        const modal = document.getElementById('modal-checkout')
        let formValid = true

        const button = window.paypal.Buttons({
            style: {
                color: 'gold',
                shape: 'pill',
                size: 'responsive',
                layout: 'horizontal',
                label: 'checkout',
                // tagline: false
            },
            createOrder: function (data, actions) {
                console.log('Creando Orden')
                if (!validateFormFields()) {
                    formValid = false
                    return
                }
                const amount = document.getElementById('checkout-total').innerHTML
                return client.query({ query: CREATE_ORDER, variables: { amount }})
                    .then(({ data }) => data.createOrder)
            },
            onApprove: function (data, actions) {
                console.log('approved')
                document.getElementById('submit-button').click()
                return client.query({ query: CAPTURE_ORDER, variables: { order_id: data.orderID, cart } })
                    .then(data => {
                        const order = JSON.parse(data.data.captureOrder)

                        if (order.status === 'COMPLETED')
                            setModalOptions({
                                header: 'PayPal Checkout',
                                body: 'Your order was completed successfully!! We will send your order as soon as possible.',
                            })
                        else
                            setModalOptions({
                                header: 'PayPal Checkout',
                                body: `An error may have occurred with the transaction. Status: ${order.status}`,
                            })
                        
                        modal.style.display = 'block'
                    })
            },
            onError: function (error) {
                console.log('Error:', error)
                if (!formValid) {
                    setModalOptions({
                        header: 'PayPal Checkout',
                        body: 'You must fill in the billing and shipping information to continue.',
                    })
                    formValid = true
                } else {
                    setModalOptions({
                        header: 'PayPal Checkout',
                        body: 'It seems that there was an error with the transaction, please try again.',
                    })
                }
                modal.style.display = 'block'
            },
            onCancel: function () {
                console.log('Cancelled')
                setModalOptions({
                    header: 'PayPal Checkout',
                    body: 'You have canceled the transaction. Not sure what you are doing? Get in touch with us.',
                })
                modal.style.display = 'block'
            },
        })
        
        if(showPayPal) button.render('#paypal-button')
        // eslint-disable-next-line
    }, [])

    // Square
    useEffect(() => {
        const modal = document.getElementById('modal-checkout')

        const main = async () => {
            const payments = window.Square.payments('sandbox-sq0idb-QrUq90laeC8jv6V6en0VyA', 'LWB5K8RGJYJSY');
            const card = await payments.card();
            await card.attach('#card-container');

            const eventHandler = async event => {
                event.preventDefault()
                if (!validateFormFields()) {
                    setModalOptions({
                        header: 'Square Checkout',
                        body: 'You must fill in the billing and shipping information to continue.',
                    })
                    modal.style.display = 'block'
                } else {
                    try {
                        const result = await card.tokenize();
                        if (result.status === 'OK') {
                            document.getElementById('submit-button').click()
                            
                            console.log(`Payment token is: ${result.token}`)

                            const amount = document.getElementById('checkout-total').innerHTML
                            const paymentToken = result.token

                            return client.query({ query: CREATE_PAYMENT, variables: { paymentToken, amount }})
                                .then(({ data }) => {
                                    console.log('data.createPayment:', data.createPayment)
                                    if (data.createPayment === 'COMPLETED')
                                        setModalOptions({
                                            header: 'Square Checkout',
                                            body: 'Your order was completed successfully!! We will send your order as soon as possible.',
                                        })
                                    else 
                                        setModalOptions({
                                            header: 'Square Checkout',
                                            body: `An error may have occurred with the transaction. Status: ${data.createPayment}`,
                                        })
                                        
                                    modal.style.display = 'block'
                                })
                        } else {
                            setModalOptions({
                                header: 'Square Checkout',
                                body: 'There was an error reading the card, please try again',
                            })
                            modal.style.display = 'block'
                        }
                    } catch (e) {
                        console.log('.Square Error:', e);
                        setModalOptions({
                            header: 'Square Checkout',
                            body: 'There was an error with the transaction, please try again',
                        })
                        modal.style.display = 'block'
                    }
                }
            };

            const cardButton = document.getElementById('card-button');
            cardButton.addEventListener('click', eventHandler);
        }
        main()
    }, [])

    const isChecked = () => {
        if (check.current.checked) {
            setName2(name); setPhone2(phone)
            setEmail2(email); setAddress2(address)
            setSuite2(suite); setCity2(city)
            setState2(state); setZipCode2(zipCode)
        } else {
            setName2(''); setPhone2('')
            setEmail2(''); setAddress2('')
            setSuite2(''); setCity2('')
            setState2(''); setZipCode2('')
        }
    }

    useEffect(() => {
        isChecked()
        // eslint-disable-next-line
    }, [name, phone, email, address, suite, city, state, zipCode])

    const validateFormFields = () => {
        const name = document.getElementById('name').value
        const phone = document.getElementById('phone').value
        const email = document.getElementById('email').value
        const address = document.getElementById('address').value
        const suite = document.getElementById('suite').value
        const city = document.getElementById('city').value
        const state = document.getElementById('state').value
        const zipCode = document.getElementById('zipcode').value
        const name2 = document.getElementById('name2').value
        const phone2 = document.getElementById('phone2').value
        const email2 = document.getElementById('email2').value
        const address2 = document.getElementById('address2').value
        const suite2 = document.getElementById('suite2').value
        const city2 = document.getElementById('city2').value
        const state2 = document.getElementById('state2').value
        const zipCode2 = document.getElementById('zipcode2').value

        if (name === '' || phone === '' || email === '' || address === '' || suite === '' || city === '' || state === '' || zipCode === '' || 
        name2 === '' || phone2 === '' || email2 === '' || address2 === '' || suite2 === '' || city2 === '' || state2 === '' || zipCode2 === '')
            return false
        
        return true
    }

    useEffect(() => {
        setTotal(subtotal)
    }, [subtotal])

    const onChange = (e, set) => set(e.target.value)

    const pay = event => {
        event.preventDefault()
        console.log('Enviando Formulario...')
        createCheckoutContact({ 
            variables: {
                shippingInfo: {
                    name,
                    phone,
                    email,
                    address,
                    address2: suite,
                    city,
                    state,
                    zipCode
                },
                billingInfo: {
                    name: name2,
                    phone: phone2,
                    email: email2,
                    address: address2,
                    address2: suite2,
                    city: city2,
                    state: state2,
                    zipCode: zipCode2
                },
            }
        })
    }

    return <>
        <Modal id="modal-checkout" {...modalOptions} />
        <section className="row" id="row-correction">
            <section className="col-lg-7 order-sm-2 order-lg-1 payment">
                <form onSubmit={pay} id="checkout-form">
                    <button type="submit" id="submit-button"></button>
                    <section className="row" id="row-correction">
                        <section className="col-lg-6 shipping">
                            <span>Shipping Information</span>
                            <section className="contact-info">
                                <input value={name} id="name" onChange={e => onChange(e, setName)} placeholder="Name" type="text" required />
                                <input value={phone} id="phone" onChange={e => onChange(e, setPhone)} placeholder="Phone" type="text" required />
                                <input value={email} id="email" onChange={e => onChange(e, setEmail)} placeholder="Email" type="text" required />
                                <input value={address} id="address" onChange={e => onChange(e, setAddress)} placeholder="Address" type="text" required />
                                <input value={suite} id="suite" onChange={e => onChange(e, setSuite)} placeholder="Apt, suite" type="text" required />
                                <input value={city} id="city" onChange={e => onChange(e, setCity)} placeholder="City" type="text" required />
                                <div className="row" id="row-correction">
                                    <div className="col-7 state">
                                        <input value={state} id="state" onChange={e => onChange(e, setState)} placeholder="State" type="text" required />
                                    </div>
                                    <div className="col-5 zip-code">
                                        <input value={zipCode} id="zipcode" onChange={e => onChange(e, setZipCode)} placeholder="Zip Code" type="text" required />
                                    </div>
                                </div>
                            </section>
                        </section>
                        <section className="col-lg-6 billing">
                            <span>Billing Information</span>
                            <section className="contact-info">
                                <input value={name2} id="name2" onChange={e => onChange(e, setName2)} placeholder="Name" type="text" required />
                                <input value={phone2} id="phone2" onChange={e => onChange(e, setPhone2)} placeholder="Phone" type="text" required />
                                <input value={email2} id="email2" onChange={e => onChange(e, setEmail2)} placeholder="Email" type="text" required />
                                <input value={address2} id="address2" onChange={e => onChange(e, setAddress2)} placeholder="Address" type="text" required />
                                <input value={suite2} id="suite2" onChange={e => onChange(e, setSuite2)} placeholder="Apt, suite" type="text" required />
                                <input value={city2} id="city2" onChange={e => onChange(e, setCity2)} placeholder="City" type="text" required />
                                <div className="row" id="row-correction">
                                    <div className="col-7 state">
                                        <input value={state2} id="state2" onChange={e => onChange(e, setState2)} placeholder="State" type="text" required />
                                    </div>
                                    <div className="col-5 zip-code">
                                        <input value={zipCode2} id="zipcode2" onChange={e => onChange(e, setZipCode2)} placeholder="Zip Code" type="text" required />
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
                </form>
                <section className="square">
                    <div id="card-container"></div>
                    <button className="square-pay" id="card-button" type="submit">
                        <img src={SquareLogo} alt="Square logo" />
                        <span>Pay</span>
                    </button>
                </section>
                { showPayPal && <>
                    <span className="or">or</span>
                    <div id="paypal-button"></div>
                </> }
            </section>
            <section className="col-lg-5 order-sm-1 order-lg-2 cart">
                <span className="my-cart">My Cart</span>
                { cart.map((item, i) => {
                    if (showPayPal && item.joinClub) setShowPayPal(false) 
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
                                    <p>Amount: {item.amount}</p>
                                    <p>Price: {item.total.toFixed(2)}</p>
                                </> :
                                <>
                                    <span>{item.name}</span>
                                    <p>Bittes: {item.choose1}</p>
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
                        <span>
                            $ <span id="checkout-total">{parseFloat(total).toFixed(2)}</span>
                        </span>
                    </div>
                </section>
            </section>
        </section>
    </>
}

export default Checkout
