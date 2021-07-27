import { useEffect, useState } from 'react'
import { gql } from "@apollo/client"

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

const Payment = ({ subtotal, discount, freeShipping, shipping, total, cart, paypal }) => {
    
    console.log(subtotal, discount, freeShipping, shipping, total, cart)

    const [modalOptions, setModalOptions] = useState({})

    // PayPal
    useEffect(() => {
        if (paypal) {
            const modal = document.getElementById('modal-payment')
            let formValid = true

            window.paypal.Buttons({
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
                    const amount = document.getElementById('checkout-total').innerHTML
                    return client.query({ query: CREATE_ORDER, variables: { amount }})
                        .then(({ data }) => data.createOrder)
                },
                onApprove: function (data, actions) {
                    console.log('approved')
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
            }).render('#paypal-button')
        }
        // eslint-disable-next-line
    }, [])

    // Square
    useEffect(() => {
        const modal = document.getElementById('modal-payment')

        const main = async () => {
            const payments = window.Square.payments('sandbox-sq0idb-QrUq90laeC8jv6V6en0VyA', 'LWB5K8RGJYJSY');
            const card = await payments.card();
            await card.attach('#card-container');

            const eventHandler = async event => {
                console.log("Total:", total)
                event.preventDefault()
                try {
                    const result = await card.tokenize();
                    if (result.status === 'OK') {
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
                            body: 'There was an error reading the card, please try again.',
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

            const cardButton = document.getElementById('card-button')
            cardButton.addEventListener('click', eventHandler)
        }
        main()
        // eslint-disable-next-line
    }, [])

    return <>
        <Modal id="modal-payment" {...modalOptions} />
        <span>Payment Information</span>
        <div className="form-text">
            The changes made in the cart, coupons, shipping information or billing information will not be reflected in payment, if you want to make changes please reload the page.
        </div>
        <section className="square">
            <div id="card-container"></div>
            <button className="square-pay" id="card-button" type="submit">
                <img src={SquareLogo} alt="Square logo" />
                <span>Pay</span>
            </button>
        </section>
        { paypal && <><span className="or">or</span><div id="paypal-button"></div></> }
    </>
}

export default Payment
