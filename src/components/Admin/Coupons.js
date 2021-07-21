import { useQuery, useMutation, gql } from "@apollo/client"

const GET_COUPONS = gql`
    query {
        getCoupons {
            code
            discount
            isActive
        }
    }
`

const CREATE_COUPON = gql`
    mutation ($code: String!, $discount: String!) {
        createCoupon(code: $code, discount: $discount) {
            response
        }
    }

`

const ACTIVATE_COUPON = gql`
    mutation ($code: String!) {
        activateCoupon(code: $code) {
            response
        }
    }

`

const DEACTIVATE_COUPON = gql`
    mutation ($code: String!) {
        deactivateCoupon(code: $code) {
            response
        }
    }

`

const DELETE_COUPON = gql`
    mutation ($code: String!) {
        deleteCoupon(code: $code) {
            response
        }
    }

`

const Coupons = ({ Loading }) => {

    const { data, loading } = useQuery(GET_COUPONS)
    data && console.log(data)

    if (loading) {
        return <Loading document="Coupons" />
    }

    return <section className="row" id="row-correction">
        <section className="col-6 p-5">
            <h1 className="display-6">Active Coupons</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.getCoupons.map(coupon => {
                            if (!coupon.isActive) return null
                            return <tr key={coupon.code}>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount}</td>
                            </tr>
                        }
                    )}
                </tbody>
            </table>
        </section>
        <section className="col-6 p-5">
            <h1 className="display-6">Deactive Coupons</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.getCoupons.map(coupon => {
                            if (coupon.isActive) return null
                            return <tr key={coupon.code}>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount}</td>
                            </tr>
                        }
                    )}
                </tbody>
            </table>
        </section>
    </section>
}

export default Coupons
