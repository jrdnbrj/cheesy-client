import { useQuery, gql } from "@apollo/client"


const GET_ORDERS = gql`
    query {
        listOrders {
            orderId
            status
            value
            name
            surname
            fullName
            payerId
            email
            address
            captureId
            captureStatus
            purchaseBreakdown
            captureTime
            createTime
            updateTime
        }
    }
`

const PayPal = () => {

    const { data: orderData } = useQuery(GET_ORDERS)
    const orders = orderData && orderData.listOrders
    // orderData && console.log('orders:', orders)
    
    return <>
        <section className="paypal-orders">
            <h1 className="display-6">ORDERS</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Value</th>
                        <th scope="col">Update Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{order.status}</td>
                            <td>{order.fullName}</td>
                            <td>{order.email}</td>
                            <td>{order.value}</td>
                            <td>{order.updateTime}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    </>
}

export default PayPal
