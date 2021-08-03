import { useQuery, gql } from "@apollo/client"


const GET_PAYMENTS = gql`
    query {
        listPayments
    }
`

const GET_INVOICES = gql`
    query {
        listInvoices
    }
`

const GET_ERRORS = gql`
    query {
        listSquareErrors {
            category
            code
            detail
            field
            customerId
            cardId
            amount
            type
            createdAt
        }
    }
`

const Square = () => {
    
    const { data: paymentsData } = useQuery(GET_PAYMENTS)
    const payments = paymentsData && JSON.parse(paymentsData.listPayments).payments
    // paymentsData && console.log('payments:', payments)

    const { data: invoicesData } = useQuery(GET_INVOICES)
    const invoices = invoicesData && JSON.parse(invoicesData.listInvoices).invoices
    // invoicesData && console.log('Invoices:', invoices)

    const { data: errorsData } = useQuery(GET_ERRORS)
    const errors = errorsData && errorsData.listSquareErrors
    // errorsData && console.log('listSquareErrors:', errorsData.listSquareErrors)
    
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
        <section className="square-errors pb-5">
            <h1 className="display-6">Errors</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Code</th>
                        <th scope="col">Detail</th>
                        <th scope="col">amount</th>
                        <th scope="col">Card ID</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {errors?.map((error, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{error.type}</td>
                            <td>{error.code}</td>
                            <td>{error.detail}</td>
                            <td>$ {error.amount}</td>
                            <td>{error.cardId}</td>
                            <td>{error.customerId}</td>
                            <td>{error.category}</td>
                            <td>{error.createdAt.replace('T', ' ')}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    </>
}

export default Square
