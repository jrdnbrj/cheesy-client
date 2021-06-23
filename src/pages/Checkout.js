import { useEffect } from 'react'
import { gql } from "@apollo/client"
import client from '../adapters/apolloClient'


const CREATE_ORDER = gql`
    query {
        createOrder
    }

`

const CAPTURE_ORDER = gql`
    query($order_id: String!) {
        captureOrder(orderId: $order_id)
    }
`

const Checkout = () => {

    // PayPal
    useEffect(() => {
        window.paypal.Buttons({
            style: {
                // layout: 'horizontal',
                color:  'blue',
                shape:  'pill',
                label:  'pay',
                height: 40
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
    })

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
    })

    return <>
        <form id="payment-form">
            <div id="card-container"></div>
            <button id="card-button" type="button">Pay</button>
        </form>

        <div id="paypal-button"></div>
    </>
}

export default Checkout