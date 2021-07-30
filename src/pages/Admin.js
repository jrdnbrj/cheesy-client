import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useMutation } from '@apollo/client'

import logo from '../assets/img/logo.png'

import Products from '../components/Admin/Products'
import Contact from '../components/Admin/Contact'
import Sales from '../components/Admin/Sales'
import Coupons from '../components/Admin/Coupons'
import CheesyBittes from '../components/Admin/CheesyBittes'
import Settings from '../components/Admin/Settings'


const LOGIN = gql`
    mutation ($password: String!) {
        login(password: $password) {
            token
            success
        }
    }
`

const Admin = () => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.token)

    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const [loginAdmin] = useMutation(LOGIN, {
        onCompleted: ({ login: { token, success } }) => {
            if (success)
                dispatch({ type: 'SET_TOKEN', token })
            else
                setLoginError(token)
            setPassword('')
        }
    })

    const Loading = ({ document }) => {
        return <section className="loading">
            <div className="spinner-border" role="status" />
            <p>Loading {document}...</p>
        </section>
    }

    const onChangePassword = (e) => {
        setLoginError('')
        setPassword(e.target.value)
    }

    const login = e => {
        e.preventDefault()
        loginAdmin({ variables: { password } })
    }

    const logout = () => dispatch({ type: 'SET_TOKEN', token: undefined })

    if (token?.length > 20) return <div className="container pt-4">
        <nav className="nav nav-pills nav-fill" role="tablist">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-products" type="button" role="tab" aria-controls="nav-products" aria-selected="true">
                Products
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                Contact
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-sales" type="button" role="tab" aria-controls="nav-sales" aria-selected="false">
                Sales
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-coupons" type="button" role="tab" aria-controls="nav-coupons" aria-selected="false">
                Coupons
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-cheesy" type="button" role="tab" aria-controls="nav-cheesy" aria-selected="false">
                Cheesy Bittes
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-settings" type="button" role="tab" aria-controls="nav-settings" aria-selected="false">
                Settings
            </button>
            <button className="nav-link" type="button" onClick={logout}>
                <i className="bi bi-box-arrow-right" />
            </button>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-products" role="tabpanel" aria-labelledby="nav-products-tab">
                <Products Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                <Contact Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-sales" role="tabpanel" aria-labelledby="nav-sales-tab">
                <Sales Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-coupons" role="tabpanel" aria-labelledby="nav-coupons-tab">
                <Coupons Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-cheesy" role="tabpanel" aria-labelledby="nav-cheesy-tab">
                <CheesyBittes Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
                <Settings Loading={Loading} />
            </div>
        </div>
    </div>

    return <div className="login-form">
        <img src={logo} className="admin-logo" alt="logo" />
        <form className="row g-3" id="row-correction" onSubmit={login}>
            <div className="col-auto">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={onChangePassword} />
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
            </div>
        </form>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
    </div>
}

export default Admin
