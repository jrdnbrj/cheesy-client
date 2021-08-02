import { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from "@apollo/client"

import Modal from '../Modal'


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

const UPDATE_DISCOUNTS = gql`
    mutation ($month: String!, $twoMonths: String!) {
        updateDiscounts(month: $month, twoMonths: $twoMonths) {
            month
            twoMonths
        }
    }
`

const UPDATE_PASSWORD = gql`
    mutation ($password: String!, $newPassword: String!) {
        updatePassword(password: $password, newPassword: $newPassword) {
            response
        }
    }
`

const UPDATE_SHIPPING = gql`
    mutation ($values: [String]!) {
        updateShipping(values: $values) {
            response
        }
    }
`

const Settings = ({ Loading }) => {

    const modal = document.getElementById('modal-settings')

    const { data, loading } = useQuery(GET_SETTINGS)
    const { data: shippings, loading: shippingsLoading } = useQuery(GET_SHIPPINGS)

    const [updateDiscounts] = useMutation(UPDATE_DISCOUNTS, {
        onCompleted: () => {
            setChangingDiscounts(false)
            setModalOptions({
                header: 'Update Discounts',
                body: 'Changes Saved Successfully.',
            })
            modal.style.display = 'block'
        },
        onError: (error) => {
            setChangingDiscounts(false)
            setModalOptions({
                header: 'Update Discounts',
                body: 'There was an error trying to save the new percentages, please try again.',
            })
            console.log('updateDiscounts error', error)
            modal.style.display = 'block'
        }
    })

    const [updatePassword] = useMutation(UPDATE_PASSWORD, {
        onCompleted: ({ updatePassword: { response } }) => {
            setChangingPassword(false)
            if (response === 'OK') {
                setModalOptions({
                    header: 'Update Password',
                    body: 'Changes Saved Successfully.',
                })
                setPassword('')
                setNewPassword('')
                setNewPassword2('')
            } else
                setModalOptions({
                    header: 'Update Password',
                    body: response,
                })
            modal.style.display = 'block'
        },
        onError: (error) => {
            setChangingPassword(false)
            setModalOptions({
                header: 'Update Password',
                body: 'There was an error trying to save the new password, please try again.',
            })
            console.log('updateDiscounts error', error)
            modal.style.display = 'block'
        }
    })

    const [updateShipping] = useMutation(UPDATE_SHIPPING, {
        onCompleted: ({ updateShipping: { response } }) => {
            setChangingShipping(false)
            if (response === true) {
                setModalOptions({
                    header: 'Update Shipping',
                    body: 'Changes Saved Successfully.',
                })
            } else
                setModalOptions({
                    header: 'Update Shipping',
                    body: 'There was an error trying to save the new shipping values, please try again.',
                })
            modal.style.display = 'block'
        },
        onError: (error) => {
            setChangingShipping(false)
            setModalOptions({
                header: 'Update Shipping',
                body: 'There was an error trying to save the new shipping values, please try again.',
            })
            modal.style.display = 'block'
        }

    })

    const [month, setMonth] = useState('')
    const [twoMonths, setTwoMonths] = useState('')

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [changingDiscounts, setChangingDiscounts] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const [changingShipping, setChangingShipping] = useState(false)

    const [modalOptions, setModalOptions] = useState({})

    useEffect(() => {
        setMonth(data?.getSettings.discountMonth)
        setTwoMonths(data?.getSettings.discount2months)
    }, [data])

    const saveDiscounts = e => {
        e.preventDefault()
        setChangingDiscounts(true)
        updateDiscounts({ variables: { month, twoMonths }})
    }

    const saveShippings = e => {
        e.preventDefault()
        setChangingShipping(true)
        const shipping = document.querySelectorAll('.shipping-value')

        const values = []

        for(let i = 0; i < shipping.length; i++) {
            values.push(shipping[i].value)
        }

        updateShipping({ variables: { values }})
    }

    const savePassword = e => {
        e.preventDefault()
        setChangingPassword(true)
        updatePassword({ variables: { password, newPassword }})
    }

    const seePassword = () => {
        const pass = document.getElementById('password-1')
        if (pass.type === 'password') {
            setPasswordVisible(true)
            document.getElementById('password-1').type = 'text'
            document.getElementById('password-2').type = 'text'
            document.getElementById('password-3').type = 'text'
        } else {
            setPasswordVisible(false)
            document.getElementById('password-1').type = 'password'
            document.getElementById('password-2').type = 'password'
            document.getElementById('password-3').type = 'password'
        }
    }

    if (loading) return <Loading document="Settings" />

    if (shippingsLoading) return <Loading document="Shipping Values" />

    return <>
        <section className="settings">
            <Modal id="modal-settings" {...modalOptions} />
            <form onSubmit={saveDiscounts}>
                <h1 className="display-6">Discounts</h1>
                <div className="row g-3">
                    <div className="col">
                        <label className="form-label ms-1">Discount percentage each months in club</label>
                        <div className="input-group mb-3">
                            <input className="form-control" type="number" 
                                value={month} onChange={e => setMonth(e.target.value)} required />
                            <span className="input-group-text" id="basic-addon1">%</span>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label ms-1">Discount percentage every two months in club</label>
                        <div className="input-group mb-3">
                            <input className="form-control" type="number" 
                                value={twoMonths} onChange={e => setTwoMonths(e.target.value)} required />
                            <span className="input-group-text" id="basic-addon1">%</span>
                        </div>
                    </div>
                </div>
                {changingDiscounts ?
                    <button type="button" className="btn btn-success mb-5" disabled>
                        <div className="spinner-border spin me-2" role="status" />
                        <span>Saving Discounts</span>
                    </button> : 
                    <button type="submit" className="btn btn-success mb-5">
                        <span>Save Discounts</span>
                    </button>
                }
            </form>
            <form onSubmit={saveShippings} className="shipping-values">
                <h1 className="display-6">Shipping Values</h1>
                <div className="row" id="row-correction">
                    {shippings?.getShippings.map(shipping => {
                        return <div className="col-3 my-2" key={shipping.state}>
                            <label className="form-label">{shipping.state}</label>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">$</span>
                                <input type="number" className="form-control shipping-value" step="any" defaultValue={shipping.value} />
                            </div>
                        </div>
                    })}
                </div>
                {changingShipping ?
                    <button type="button" className="btn btn-success mb-5" disabled>
                        <div className="spinner-border spin me-2" role="status" />
                        <span>Saving Shipping Values</span>
                    </button> : 
                    <button type="submit" className="btn btn-success mb-5">
                        <span>Save Shipping Values</span>
                    </button>
                }
            </form>
            <form onSubmit={savePassword}>
                <h1 className="display-6">Password</h1>
                <div className="input-group">
                    <input type="password" className="form-control" placeholder="Current Password" value={password} 
                        onChange={e => setPassword(e.target.value)} id="password-1" required />
                    <input type="password" className="form-control" placeholder="New Password" value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} id="password-2" required />
                    <input type="password" className="form-control" placeholder="New Password Again" value={newPassword2} 
                        onChange={e => setNewPassword2(e.target.value)} id="password-3" required />
                    {passwordVisible ? 
                        <i className="bi bi-eye-slash" onClick={seePassword} /> : 
                        <i className="bi bi-eye" onClick={seePassword} />
                    }
                </div>
                <div className="form-text">Your password must be 8-20 characters long.</div>
                {changingPassword ?
                    <button type="button" className="btn btn-success mb-5" disabled>
                        <div className="spinner-border spin me-2" role="status" />
                        <span>Changing Password</span>
                    </button> : 
                    <button type="submit" className="btn btn-success mb-5">
                        <span>Change Password</span>
                    </button>
                }
            </form>
        </section>
    </>
}

export default Settings
