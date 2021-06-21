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

    return <>
        <div id="paypal-button"></div>
    </>
}

export default Checkout