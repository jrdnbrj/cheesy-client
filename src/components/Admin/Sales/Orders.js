import { useQuery, gql } from "@apollo/client"


const GET_ORDERS = gql`
    query {
        getOrders {
            type
            createdAt
            square {
                createdAt
                status
                buyerEmailAddress
                totalMoney
                paymentId
                subscriptionId
                startDate
            }
            paypal {
                orderId
                status
                value
                fullName
                email
                createTime
            }
            cart {
                amount
                price
                name
                total
                bundleUp
                buyOnce
                joinClub
                interval
                choose1
                choose3
            }
            checkoutInfo {
                shippingInformation {
                    name
                    phone
                    email
                    address
                    address2
                    city
                    state
                    zipCode
                }
                billingInformation {
                    name
                    phone
                    email
                    address
                    address2
                    city
                    state
                    zipCode
                }
            }
        }
    }
`

const Orders = () => {

    const { data } = useQuery(GET_ORDERS)

    return <>
        <table className="table table-striped table-hover my-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Method</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {data?.getOrders.map((order, index) => {
                    return <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {order.square ? 
                            <>
                                <td>{order.type} {order.type === 'SUBSCRIPTION' ? order.cart[0].interval === 1 ? '(Month)' : '(Two Months)' : ''}</td>
                                <td>{order.square.status}</td>
                                <td>$ {order.square.totalMoney / 100}</td>
                                <td>Square</td>
                            </> :
                            <>
                                <td>{order.type}</td>
                                <td>{order.paypal.status}</td>
                                <td>$ {order.paypal.value}</td>
                                <td>PayPal</td>
                            </>
                        }
                        <td>
                            <i class="bi bi-arrow-return-left me-2" onClick={() => console.log('Refund')}></i>
                            <i className="bi bi-x-square-fill" onClick={() => console.log('Cancel')} />
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
}

export default Orders
