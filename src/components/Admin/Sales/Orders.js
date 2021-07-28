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
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Method</th>
                </tr>
            </thead>
            <tbody>
                {data?.getOrders.map((order, index) => {
                    return <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{order.type} {order.type === 'SUBSCRIPTION' ? order.cart[0].interval === 1 ? '(Month)' : '(Two Months)' : ''}</td>
                        <td>{order.square.status}</td>
                        <td>$ {order.square.totalMoney / 100}</td>
                        <td>{order.square ? 'Square' : order.paypal ? 'PayPal' : '-'}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
}

export default Orders
