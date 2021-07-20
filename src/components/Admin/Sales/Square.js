import { useQuery, gql } from "@apollo/client"


const GET_PAYMENTS = gql`
    query {
        listPayments
    }
`

const GET_CUSTOMERS = gql`
    query {
        listCustomers
    }
`

const GET_INVOICES = gql`
    query {
        listInvoices
    }
`

const GET_CATALOGS = gql`
    query {
        listCatalogs
    }
`

const Square = () => {
    
    const { data: paymentsData } = useQuery(GET_PAYMENTS)
    const payments = paymentsData && JSON.parse(paymentsData.listPayments).payments
    paymentsData && console.log('payments:', payments)

    const { data } = useQuery(GET_CUSTOMERS)
    const customers = data && JSON.parse(data.listCustomers).customers
    data && console.log('Customers:', customers)

    const { data: invoicesData } = useQuery(GET_INVOICES)
    const invoices = invoicesData && JSON.parse(invoicesData.listInvoices).invoices
    invoicesData && console.log('Invoices:', invoices)

    const { data: catalogsData } = useQuery(GET_CATALOGS)
    const catalogs = catalogsData && JSON.parse(catalogsData.listCatalogs).objects
    catalogsData && console.log('catalogs:', catalogs)
    
    return <>
        <section className="square-payments">
            <h1 className="display-6">Payments</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Card Brand</th>
                        <th scope="col">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {payments && payments.map((payment, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{payment.status}</td>
                            <td>$ {payment.amount_money.amount / 100}</td>
                            <td>{payment.card_details.card.card_brand}</td>
                            <td>{payment.created_at.replace('T', ' ')}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
        <section className="square-customers">
            <h1 className="display-6">Customers</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Given Name</th>
                        <th scope="col">Family Name</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && customers.map((customer, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{customer.id}</td>
                            <td>{customer.given_name}</td>
                            <td>{customer.family_name}</td>
                            <td>{customer.birthday}</td>
                            <td>{customer.email_address}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
        <section className="square-catalogs">
            <h1 className="display-6">Catalogs</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phases</th>
                        <th scope="col">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {catalogs && catalogs.map((catalog, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{catalog.id}</td>
                            <td>{catalog.subscription_plan_data.name}</td>
                            <td>
                                <span>{catalog.subscription_plan_data.phases[0].cadence}</span>
                                <span> ${catalog.subscription_plan_data.phases[0].recurring_price_money.amount / 100}</span>
                            </td>
                            <td>{catalog.updated_at.replace('T', ' ')}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
        <section className="square-invoices pb-5">
            <h1 className="display-6">Invoices</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Value</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Customer ID</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices && invoices.map((invoice, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{invoice.status}</td>
                            <td>$ {invoice.payment_requests[0].computed_amount_money.amount / 100}</td>
                            <td>{invoice.created_at.replace('T', ' ')}</td>
                            <td>{invoice.primary_recipient.customer_id}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    </>
}

export default Square
