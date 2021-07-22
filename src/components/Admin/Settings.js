import { useState } from 'react'
import { useQuery, gql } from "@apollo/client"


const GET_SETTINGS = gql`
    query getSettings {
        getSettings {
            discountMonth
            discount2months
        }
    }
`

const Settings = ({ Loading }) => {

    const { data, loading } = useQuery(GET_SETTINGS)

    // data && console.log(data)

    const [month, setMonth] = useState(data?.getSettings.discountMonth)
    const [twoMonths, setTwoMonths] = useState(data?.getSettings.discount2months)

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const updateDiscounts = e => {
        e.preventDefault()
    }

    const updatePassword = e => {
        e.preventDefault()
    }

    if (loading) return <Loading document="Settings" />

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
