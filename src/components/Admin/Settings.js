import { useState, useEffect } from 'react'
import { useQuery, gql } from "@apollo/client"


const GET_SETTINGS = gql`
    query getSettings {
        getSettings {
            discountMonth
            discount2months
        }
    }
`

const GET_SHIPPINGS = gql`
    query shippings {
        getShippings {
            state
            value
        }
    }
`

const Settings = ({ Loading }) => {

    const { data, loading } = useQuery(GET_SETTINGS)
    const { data: shippings, loading: shippingsLoading } = useQuery(GET_SHIPPINGS)

    const [month, setMonth] = useState('')
    const [twoMonths, setTwoMonths] = useState('')

    useEffect(() => {
        setMonth(data?.getSettings.discountMonth)
        setTwoMonths(data?.getSettings.discount2months)
    }, [data])

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const updateDiscounts = e => {
        e.preventDefault()
    }

    const updateShippings = e => {
        e.preventDefault()
    }

    const updatePassword = e => {
        e.preventDefault()
    }

    if (loading) return <Loading document="Settings" />

    if (shippingsLoading) return <Loading document="Shipping Values" />

    return <>
        <section className="settings">
            <form onSubmit={updateDiscounts}>
                <h1 className="display-6 mx-5">Discounts</h1>
                <div className="row g-3">
                    <div className="col mx-5">
                        <label className="form-label ms-1">Discount percentage each months in club</label>
                        <div className="input-group mb-3">
                            <input className="form-control" type="number" 
                                value={month} onChange={e => setMonth(e.target.value)} required />
                            <span className="input-group-text" id="basic-addon1">%</span>
                        </div>
                    </div>
                    <div className="col mx-5">
                        <label className="form-label ms-1">Discount percentage every two months in club</label>
                        <div className="input-group mb-3">
                            <input className="form-control" type="number" 
                                value={twoMonths} onChange={e => setTwoMonths(e.target.value)} required />
                            <span className="input-group-text" id="basic-addon1">%</span>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-success mb-5 mx-5">
                    <span>Save Discounts</span>
                </button>
            </form>
            <form onSubmit={updateShippings} className="shipping-values">
                <h1 className="display-6 mx-5">Shipping Values</h1>
                <div className="row mx-5" id="row-correction">
                    {shippings?.getShippings.map(shipping => {
                        return <div className="col-3 my-2" key={shipping.state}>
                            <label className="form-label">{shipping.state}</label>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">$</span>
                                <input type="number" className="form-control shipping-value" defaultValue={shipping.value} />
                            </div>
                        </div>
                    })}
                </div>
                <button type="submit" className="btn btn-success mb-5 mt-3 mx-5">
                    <span>Save Changes</span>
                </button>
            </form>
            <form onSubmit={updatePassword}>
                <h1 className="display-6 mx-5">Password</h1>
                <div className="input-group mx-5">
                    <input type="password" className="form-control" placeholder="Current Password" 
                        value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="password" className="form-control" placeholder="New Password"
                        value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className="form-text mx-5">Your password must be 6-20 characters long.</div>
                <button type="submit" className="btn btn-success mb-5 mt-3 mx-5">
                    <span>Change Password</span>
                </button>
            </form>
        </section>
    </>
}

export default Settings
