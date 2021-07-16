import { useQuery, gql } from "@apollo/client"


const GET_PLANS = gql`
    query {
        listPlans
    }
`

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
    
    const { data } = useQuery(GET_PLANS)
    const plans = data && JSON.parse(data.listPlans).plans
    data && console.log('plans:', plans)

    const { data: orderData } = useQuery(GET_ORDERS)
    const orders = orderData && orderData.listOrders
    orderData && console.log('orders:', orders)
    
    return <>
        <section className="paypal-plans">
            <h1 className="display-6">PLANS</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Create Time</th>
                    </tr>
                </thead>
                <tbody>
                    {plans && plans.map((plan, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{plan.id}</td>
                            <td>{plan.status}</td>
                            <td>{plan.create_time}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
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
