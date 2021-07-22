import { useEffect, useState } from 'react'
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

    const onCompleted = () => refetch()

    const { data, loading, refetch, networkStatus } = useQuery(GET_COUPONS, { 
        fetchPolicy: "no-cache", 
        notifyOnNetworkStatusChange: true 
    })
    const [createCoupon] = useMutation(CREATE_COUPON, { onCompleted: data => {
        const response = data.createCoupon.response
        if (response !== 'OK')
            setCouponError(response)
        refetch()
    }})
    const [activateCoupon] = useMutation(ACTIVATE_COUPON, { onCompleted })
    const [deactivateCoupon] = useMutation(DEACTIVATE_COUPON, { onCompleted })
    const [deleteCoupon] = useMutation(DELETE_COUPON, { onCompleted })
    data && console.log(data)

    const [coupons, setCoupons] = useState([])
    const [couponError, setCouponError] = useState('')

    useEffect(() => {
        setCoupons(data?.getCoupons)
    }, [data])

    const CreateModal = () => {
        return <div id='create-modal' className="modal-container">
            <div className="modal-content">
                <div className="modal-header row" id="row-correction">
                    <div className="col-10">
                        <strong>Create Coupon</strong>
                    </div>
                    <div className="col-2">
                        <span className="modal-close" onClick={closeModal}>
                            <i className="bi-x-lg" />
                        </span>
                    </div>
                </div>
                <div className="modal-body">
                    <label className="form-label">Code</label>
                    <input className="form-control" type="text" id="new-code" />
                    <label className="form-label">Discount</label>
                    <input className="form-control" type="text" id="new-discount" />
                    <div className="form-text">Write 0 in discount for free shipping.</div>
                </div>
                <div className="modal-footer">
                    <button className="btn-danger btn" onClick={closeModal}>
                        Cancel
                    </button>
                    <button className="btn-success btn" onClick={create}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    }

    const openModal = () => {
        const modal = document.getElementById('create-modal')
        modal.style.display = 'block'
    }

    const closeModal = () => {
        const modal = document.getElementById('create-modal')
        modal.style.display = 'none'
    }

    const create = () => {
        setCouponError('')

        const code = document.getElementById('new-code').value
        const discount = document.getElementById('new-discount').value

        createCoupon({ variables: { code, discount }})
    }

    const activate = code => {
        setCouponError('')
        activateCoupon({ variables: { code } })
    }

    const deactivate = code => {
        setCouponError('')
        deactivateCoupon({ variables: { code } })
    }

    const remove = code => {
        setCouponError('')
        deleteCoupon({ variables: { code } })
    }


    if (networkStatus === networkStatus.refetch || loading) {
        return <Loading document="Coupons" />
    }

    return <section className="row" id="row-correction">
        <CreateModal />
        {couponError && <div className="alert alert-danger">{couponError}</div>}
        <section className="col-6 p-5">
            <section className="row">
                <h1 className="display-6 col-10">Active Coupons</h1>
                <i className="bi bi-plus-circle-fill add-icon col" onClick={openModal} />
            </section>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Discount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {coupons?.map(coupon => {
                            if (!coupon.isActive) return null
                            return <tr key={coupon.code}>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount === '0' ? 'Free Shipping' : `${coupon.discount}%`}</td>
                                <td>
                                    <i className="bi bi-x-circle-fill coupons-icons" onClick={() => remove(coupon.code)} />
                                    <i className="bi bi-arrow-right-square-fill coupons-icons" onClick={() => deactivate(coupon.code)} />
                                </td>
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
                        <th></th>
                        <th>Code</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons?.map(coupon => {
                            if (coupon.isActive) return null
                            return <tr key={coupon.code}>
                                <td>
                                    <i className="bi bi-arrow-left-square-fill coupons-icons" onClick={() => activate(coupon.code)} />
                                    <i className="bi bi-x-circle-fill coupons-icons" onClick={() => remove(coupon.code)} />
                                </td>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount === '0' ? 'Free Shipping' : `${coupon.discount}%`}</td>
                            </tr>
                        }
                    )}
                </tbody>
            </table>
        </section>
    </section>
}

export default Coupons
