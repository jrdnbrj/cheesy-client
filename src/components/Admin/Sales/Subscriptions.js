import { useState } from 'react'
import { useLazyQuery, gql } from "@apollo/client"
import { useSelector } from 'react-redux'

import Modal from '../../Modal'
import JSONPretty from 'react-json-pretty'

const RETRIEVE_SUBSCRIPTION = gql`
    query ($subscriptionId: String!) {
        retrieveSubscription(subscriptionId: $subscriptionId) 
    }
`

const GET_PAYMENT = gql`
    query ($paymentId: String!) {
        getPayment(paymentId: $paymentId) 
    }
`

const GET_ORDER = gql`
    query ($orderId: String!) {
        getOrder(orderId: $orderId)
    }
`

const CANCEL_SUBSCRIPTION = gql`
    query ($subscriptionId: String!) {
        cancelSubscription(subscriptionId: $subscriptionId)
    }
`

const Subscriptions = ({ Loading }) => {

    const orders = useSelector(state => state.orders)

    const [modalOptions, setModalOptions] = useState({})
    const [modalIndex, setModalIndex] = useState(0)

    const [cancelSubscription] = useLazyQuery(CANCEL_SUBSCRIPTION, {
        onCompleted: ({ cancelSubscription: response }) => {
            console.log('cancel subscription completed:', response)
            const modal = document.getElementById('modal-subscriptions')
            console.log(response)
            if (response === 'CANCELED') {
                setModalOptions({
                    header: 'Cancel Subscription',
                    body: 'The subscription has been successfully canceled.',
                })
            } else 
                setModalOptions({
                    header: 'Cancel Subscription',
                    body: 'The subscription may not have been canceled, please check the subscription information again.',
                })
            modal.style.display = 'block'
        },
        onError: (error) => {
            console.log('cancel subscription error', error)
            const modal = document.getElementById('modal-subscriptions')
            setModalOptions({
                header: 'Cancel Subscription',
                body: 'There was an error trying to unsubscribe. Please try again.',
            })
            modal.style.display = 'block'
        }
    })

    const [retrieveSubscription, { data: subscription, loading: loadingSubscription }] = useLazyQuery(RETRIEVE_SUBSCRIPTION, {
        onCompleted: () => {
            const modal = document.getElementById('subscriptions-modal')
            modal.style.display = 'block'
        },
        onError: (error) => {
            const modal = document.getElementById('modal-subscriptions')
            setModalOptions({
                header: 'Retrieve Subscription',
                body: 'An error occurred trying to get subscription information. Please try again.',
            })
            modal.style.display = 'block'
        },
        fetchPolicy: "no-cache"
    })

    const [getPayment, { data: payment, loading: loadingPayment }] = useLazyQuery(GET_PAYMENT, {
        onCompleted: () => {
            const modal = document.getElementById('subscriptions-modal')
            modal.style.display = 'block'
        },
        onError: (error) => {
            const modal = document.getElementById('modal-subscriptions')
            setModalOptions({
                header: 'Retrieve Payment',
                body: 'An error has occurred trying to get payment information. Please try again.',
            })
            modal.style.display = 'block'
        },
        fetchPolicy: "no-cache"
    })

    const [getOrder, { data: orderData, loading: loadingOrder }] = useLazyQuery(GET_ORDER, {
        onCompleted: () => {
            const modal = document.getElementById('subscriptions-modal')
            modal.style.display = 'block'
        },
        onError: (error) => {
            const modal = document.getElementById('modal-subscriptions')
            setModalOptions({
                header: 'Retrieve Order',
                body: 'An error has occurred trying to get order information. Please try again.',
            })
            modal.style.display = 'block'
        },
        fetchPolicy: "no-cache"
    })

    const cancel = subscriptionId => {
        cancelSubscription({ variables: { subscriptionId } })
    }

    const openModal = i => {
        setModalIndex(i)
        const modal = document.getElementById('subscriptions-modal')
        if (modal) modal.style.display = 'block'
    }

    const closeModal = () => {
        const modal = document.getElementById('subscriptions-modal')
        modal.style.display = 'none'
    }

    const requestSubscription = subscriptionId => {
        retrieveSubscription({ variables: { subscriptionId } })
    }

    const requestPayment = paymentId => {
        getPayment({ variables: { paymentId } })
    }

    const requestOrder = orderId => {
        getOrder({ variables: { orderId } })
    }

    const ModalInfo = ({ id, id2 }) => {
        let modalData = {}
        if (payment) {
            modalData = JSON.parse(payment.getPayment)
            if (modalData.id === id) {
                delete modalData['amount_money']
                delete modalData['approved_money']
                delete modalData['billing_address']
                delete modalData['card_details']
                delete modalData['delay_action']
                delete modalData['delay_duration']
                delete modalData['delayed_until']
                delete modalData['processing_fee']
                delete modalData['shipping_address']
                delete modalData['receipt_url']

                return <section className="mt-3">
                    <JSONPretty  id="json-pretty" data={modalData} />
                </section>
            }
        }
        if (subscription) {
            modalData = JSON.parse(subscription.retrieveSubscription)
            if (modalData.id === id2) {
                delete modalData['version']
                delete modalData['charged_through_date']
                delete modalData['invoice_ids']
                delete modalData['plan']['id']
                delete modalData['plan']['is_deleted']
                delete modalData['plan']['present_at_all_locations']
                delete modalData['plan']['subscription_plan_data']['phases'][0]['ordinal']

                return <section className="mt-3">
                    {modalData.canceled_date && modalData.status === 'PENDING' ?
                        <div className="alert alert-primary" role="alert">
                            The subscription will be canceled in {modalData.canceled_date}
                        </div> :
                        modalData.status === 'CANCELED' ?
                        <div className="alert alert-primary" role="alert">
                            The subscription has been canceled on {modalData.canceled_date}
                        </div> : null
                    }
                    <JSONPretty  id="json-pretty" data={modalData} />
                </section>
            }
        }
        if (orderData) {
            modalData = JSON.parse(orderData.getOrder)
            if (modalData.id === id) {
                delete modalData['intent']
                delete modalData['purchase_units'][0]['reference_id']
                delete modalData['purchase_units'][0]['amount']['breakdown']
                delete modalData['purchase_units'][0]['description']
                delete modalData['purchase_units'][0]['shipping']
                delete modalData['purchase_units'][0]['payments']['captures'][0]['amount']
                delete modalData['purchase_units'][0]['payments']['captures'][0]['final_capture']
                delete modalData['purchase_units'][0]['payments']['captures'][0]['seller_protection']
                delete modalData['purchase_units'][0]['payments']['captures'][0]['links']
                delete modalData['links']
                
                return <section className="mt-3">
                    <JSONPretty  id="json-pretty" data={modalData} />
                </section>
            }
        }
        return null
    }

    const isPayment = (id, id2) => {
        if (payment) {
            const pay = JSON.parse(payment.getPayment)
            if (pay.id === id) return true
        }
        if (subscription) {
            const sub = JSON.parse(subscription.retrieveSubscription)
            if (sub.id === id2) return true
        }
        return false
    }

    const isOrder = id => {
        if (orderData) {
            const order = JSON.parse(orderData.getOrder)
            if (order.id === id) return true
        }
        return false

    }

    const InfoModal = () => {
        const order = orders[modalIndex]

        if (!order) return null
        
        const billing = order.checkoutInfo.billingInformation
        const shipping = order.checkoutInfo.shippingInformation
        
        return <div id='subscriptions-modal' className="modal-container">
            <div className="modal-content-info">
                <div className="modal-header row" id="row-correction">
                    <div className="col-10">
                        <strong>Order Info</strong>
                    </div>
                    <div className="col-2">
                        <span className="modal-close" onClick={closeModal}>
                            <i className="bi-x-lg" />
                        </span>
                    </div>
                </div>
                <div className="modal-body">
                    <section className="row" id="row-correction">
                        <section className="col">
                            <h4>Information</h4>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Interval: </strong>
                                    <span>{order.cart[0].interval === 1 ? 'Monthly' : order.cart[0].interval === 2 ? 'Bi-Monthly' : ''}</span>
                                </li>
                                {order.square ? 
                                    <>
                                        <li className="list-group-item">
                                            <strong>Type: </strong>
                                            <span>{order.type}</span>
                                        </li>
                                        {order.type === 'SUBSCRIPTION' &&
                                            <li className="list-group-item">
                                                <strong>Start Date: </strong>
                                                <span>{order.square.startDate.replace('T', ' ')}</span>
                                            </li>
                                        }
                                        <li className="list-group-item">
                                            <strong>Payment Method: </strong>
                                            <span>Square</span>
                                        </li> 
                                        <li className="list-group-item">
                                            <strong>Total: </strong>
                                            <span>$ {(order.square.totalMoney / 100).toFixed(2)}</span>
                                        </li>
                                    </> :
                                    order.paypal ?
                                    <>
                                        <li className="list-group-item">
                                            <strong>Payment Method: </strong>
                                            <span>PayPal</span>
                                        </li> 
                                        <li className="list-group-item">
                                            <strong>Total: </strong>
                                            <span>$ {order.paypal.value}</span>
                                        </li>
                                    </> : null
                                }
                                <li className="list-group-item">
                                    <strong>Shipping Value: </strong>
                                    <span>$ {order.shipping}</span>
                                </li>
                                <li className="list-group-item">
                                    <strong>Discount: </strong>
                                    <span>$ {order.discount}</span>
                                </li>
                                <li className="list-group-item">
                                    <strong>Created at: </strong>
                                    <span>{order.createdAt.replace('T', ' ')}</span>
                                </li>
                            </ul>
                        </section>
                        <ul className="list-group col">
                            <h4>Cart</h4>
                            {order.cart.map((item, index) => {
                                return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    {item.name}
                                    <section>
                                        <span className="badge bg-primary rounded-pill mx-1">{item.amount}</span>
                                        <span className="badge bg-success rounded-pill mx-1">$ {item.total}</span>
                                    </section>
                                </li>
                            })}
                        </ul>
                    </section>
                    <section className="row mt-3" id="row-correction">
                        <ul className="list-group col">
                            <h4>Shipping Information</h4>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.name}
                                <span className="badge bg-secondary rounded-pill">Name</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.phone}
                                <span className="badge bg-secondary rounded-pill">Phone</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.email}
                                <span className="badge bg-secondary rounded-pill">Email</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.address}
                                <span className="badge bg-secondary rounded-pill">Address</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.address2}
                                <span className="badge bg-secondary rounded-pill">Address 2</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.city}
                                <span className="badge bg-secondary rounded-pill">City</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.state}
                                <span className="badge bg-secondary rounded-pill">State</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {shipping.zipCode}
                                <span className="badge bg-secondary rounded-pill">Zip Code</span>
                            </li>
                        </ul>
                        <ul className="list-group col">
                            <h4>Billing Information</h4>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.name}
                                <span className="badge bg-secondary rounded-pill">Name</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.phone}
                                <span className="badge bg-secondary rounded-pill">Phone</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.email}
                                <span className="badge bg-secondary rounded-pill">Email</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.address}
                                <span className="badge bg-secondary rounded-pill">Address</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.address2}
                                <span className="badge bg-secondary rounded-pill">Address 2</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.city}
                                <span className="badge bg-secondary rounded-pill">City</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.state}
                                <span className="badge bg-secondary rounded-pill">State</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {billing.zipCode}
                                <span className="badge bg-secondary rounded-pill">Zip Code</span>
                            </li>
                        </ul>
                    </section>
                    {order.type === 'SUBSCRIPTION' && 
                        <button className="btn btn-primary d-block mx-auto mt-3" onClick={() => cancel(order.square.subscriptionId)}>
                            Cancel Subscription
                        </button>}
                    {order.square ? isPayment(order.square.paymentId, order.square.subscriptionId) ? 
                        <ModalInfo id={order.square.paymentId} id2={order.square.subscriptionId} /> : 
                        order.type === 'SUBSCRIPTION' ? 
                        <button className="btn btn-primary d-block mx-auto mt-3" onClick={() => requestSubscription(order.square.subscriptionId)}>
                            Request Subscription Info
                        </button> :
                        order.type === 'ONCE' ? 
                        <button className="btn btn-primary d-block mx-auto mt-3" onClick={() => requestPayment(order.square.paymentId)}>
                            Request Payment Info
                        </button> : null : null}
                    {order.paypal ? isOrder(order.paypal.orderId) ?
                        <ModalInfo id={order.paypal.orderId} id2={0} /> : 
                        <button className="btn btn-primary d-block mx-auto mt-3" onClick={() => requestOrder(order.paypal.orderId)}>
                            Request Order Info
                        </button> : null }
                </div>
                <div className="modal-footer">
                    <button className="btn-success btn" onClick={closeModal}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    }

    if (loadingPayment || loadingSubscription || loadingOrder)
        return <Loading document="Order Info" />

    return <>
        <Modal id="modal-subscriptions" {...modalOptions} />
        {orders && <InfoModal />}
        <table className="table table-striped table-hover my-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Types</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Method</th>
                </tr>
            </thead>
            <tbody>
                {orders?.map((order, index) => {
                    if (order.type === 'ONCE') return null
                    return <tr key={index} onClick={() => openModal(index)}>
                        <th scope="row">{index + 1}</th>
                        {order.square ? 
                            <>
                                <td>{order.type} {order.type === 'SUBSCRIPTION' ? order.cart[0].interval === 1 ? '(Month)' : '(Two Months)' : ''}</td>
                                <td>{order.checkoutInfo.shippingInformation.name}</td>
                                <td>$ {(order.square.totalMoney / 100).toFixed(2)}</td>
                                <td>Square</td>
                            </> :
                            <>
                                <td>{order.type}</td>
                                <td>{order.checkoutInfo.shippingInformation.name}</td>
                                <td>$ {order.paypal.value}</td>
                                <td>PayPal</td>
                            </>
                        }
                    </tr>
                })}
            </tbody>
        </table>
    </>
}

export default Subscriptions
