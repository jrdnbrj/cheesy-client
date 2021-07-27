import { useEffect, useState, createRef } from 'react'
import { gql, useMutation, useLazyQuery } from "@apollo/client"
import { useSelector } from 'react-redux'

import Modal from '../components/Modal'
import Payment from '../components/Payment'


const CREATE_CHECKOUT_CONTACT = gql`
    mutation ($billingInfo: CheckoutInfoInputType, $shippingInfo: CheckoutInfoInputType) {
        createCheckoutContact(billingInfo: $billingInfo, shippingInfo: $shippingInfo) {
            response
        }
    }
`

const CHECK_COUPON = gql`
    query ($code: String!) {
        checkCoupon(code: $code) {
            code
            discount
            isActive
        }
    }
`

const CHECK_SHIPPING = gql`
    query ($state: String!) {
        getShippingByState(state: $state) {
            response
            value
        }
    }
`

const Checkout = () => {

    const [showPayPal, setShowPayPal] = useState(true)

    const [modalOptions, setModalOptions] = useState({})
    const [checkout, setCheckout] = useState(false)

    const cart = useSelector(state => state.cart)
    const subtotal = useSelector(state => state.subtotal)

    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [shippingValue, setShippingValue] = useState(0)
    const [discountRate, setDiscountRate] = useState(0)
    const [freeShipping, setFreeShipping] = useState(false)

    const [couponCode, setCouponCode] = useState('')
    const [couponError, setCouponError] = useState('')
    const [shippingError, setShippingError] = useState('')

    const [formLoading, setFormLoading] = useState(false)

    const [checkCoupon] = useLazyQuery(CHECK_COUPON, { 
        onCompleted: data => {
            const response = data.checkCoupon
            if (!response.isActive)
                setCouponError(response.code)
            else if (response.discount === '0') {
                setFreeShipping(true)
                setDiscount(0)
                setDiscountRate(0)
            } else {
                setFreeShipping(false)

                const discount = subtotal * response.discount / 100
                setDiscount(discount.toFixed(2))
                setDiscountRate(response.discount)
            }
        },
        onError: ({ error }) => {
            const modal = document.getElementById('modal-checkout')
            setModalOptions({
                header: 'Shipping Information',
                body: 'An error occurred trying to verify the coupon, please try again.',
            })
            modal.style.display = 'block'
        }
    })

    const [checkShipping] = useLazyQuery(CHECK_SHIPPING, { 
        onCompleted: data => {
            const { response, value } = data.getShippingByState

            if (response) {
                setShippingError('')
                setShippingValue(value)
            } else {
                setShippingError(value)
                setShippingValue(0)
            }
        },
        onError: ({ error }) => {
            const modal = document.getElementById('modal-checkout')
            setModalOptions({
                header: 'Shipping Information',
                body: 'An error occurred trying to verify the shipping cost, please try again.',
            })
            modal.style.display = 'block'
        }
    })

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [suite, setSuite] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')

    const [name2, setName2] = useState('')
    const [phone2, setPhone2] = useState('')
    const [email2, setEmail2] = useState('')
    const [address2, setAddress2] = useState('')
    const [suite2, setSuite2] = useState('')
    const [city2, setCity2] = useState('')
    const [state2, setState2] = useState('')
    const [zipCode2, setZipCode2] = useState('')

    const check = createRef()

    const [createCheckoutContact] = useMutation(CREATE_CHECKOUT_CONTACT, {
        onCompleted: ({ createCheckoutContact: data }) => {
            const modal = document.getElementById('modal-checkout')

            setFormLoading(false)

            if (data.response === 'success') setCheckout(true)
            else {
                setModalOptions({
                    header: 'Shipping and Billing Information',
                    body: 'An error occurred saving billing information and shipping information, please try again.',
                })
                modal.style.display = 'block'
            }
        },
        onError: ({ error }) => {
            const modal = document.getElementById('modal-checkout')
            setFormLoading(false)
            setModalOptions({
                header: 'Shipping and Billing Information',
                body: 'An error occurred saving billing information and shipping information, please try again.',
            })
            modal.style.display = 'block'
        }
    })

    const isChecked = () => {
        if (check.current.checked) {
            setName2(name); setPhone2(phone)
            setEmail2(email); setAddress2(address)
            setSuite2(suite); setCity2(city)
            setState2(state); setZipCode2(zipCode)
        } else {
            setName2(''); setPhone2('')
            setEmail2(''); setAddress2('')
            setSuite2(''); setCity2('')
            setState2(''); setZipCode2('')
        }
    }

    useEffect(() => {
        isChecked()
        // eslint-disable-next-line
    }, [name, phone, email, address, suite, city, state, zipCode])

    const validateFormFields = () => {
        if (name === '' || phone === '' || email === '' || address === '' || 
            suite === '' || city === '' || state === '' || zipCode === '' || 
            name2 === '' || phone2 === '' || email2 === '' || address2 === '' || 
            suite2 === '' || city2 === '' || state2 === '' || zipCode2 === '')
            return false
        
        return true
    }

    useEffect(() => {
        if (freeShipping) setTotal(subtotal - discount)
        else setTotal(subtotal - discount + parseFloat(shippingValue))
    }, [subtotal, discount, shippingValue, freeShipping])

    const onChange = (e, set) => set(e.target.value)

    const onChangeState = (e, set) => {
        set(e.target.value)
        checkShipping({ variables: { state: e.target.value }})
    }

    const changeCode = value => {
        setCouponError('')
        setCouponCode(value)
    }

    const addCoupon = () => {
        if (couponCode === '') {
            setCouponError('Please enter a coupon code.')
            return
        }
        checkCoupon({ variables: { code: couponCode } })
        setCouponError('')
    }

    const pay = event => {
        event.preventDefault()
        createCheckoutContact({ 
            variables: {
                shippingInfo: {
                    name, phone, email, address, 
                    address2: suite, city,
                    state, zipCode
                },
                billingInfo: {
                    name: name2, phone: phone2,
                    email: email2, address: address2,
                    address2: suite2, city: city2,
                    state: state2, zipCode: zipCode2
                },
            }
        })
    }

    const proceedToCheckout = () => {
        setFormLoading(true)

        const modal = document.getElementById('modal-checkout')
        
        if (shippingError) {
            setFormLoading(false)
            setModalOptions({ header: 'Shipping Information', body: shippingError })
            modal.style.display = 'block'
        } else if (!validateFormFields()) {
            setFormLoading(false)
            setModalOptions({
                header: 'Shipping and Billing Information',
                body: 'You must fill in the billing and shipping information to continue.',
            })
            modal.style.display = 'block'
        } else document.getElementById('submit-button').click()
    }

    return <>
        <Modal id="modal-checkout" {...modalOptions} />
        <section className="row" id="row-correction">
            <section className="col-lg-7 order-sm-2 order-lg-1 payment">
                <form onSubmit={pay} id="checkout-form">
                    <button type="submit" id="submit-button"></button>
                    <section className="row" id="row-correction">
                        <section className="col-lg-6 shipping">
                            <span>Shipping Information</span>
                            <section className="contact-info">
                                <input value={name} id="name" onChange={e => onChange(e, setName)} placeholder="Name" type="text" required />
                                <input value={phone} id="phone" onChange={e => onChange(e, setPhone)} placeholder="Phone" type="text" required />
                                <input value={email} id="email" onChange={e => onChange(e, setEmail)} placeholder="Email" type="text" required />
                                <input value={address} id="address" onChange={e => onChange(e, setAddress)} placeholder="Address" type="text" required />
                                <input value={suite} id="suite" onChange={e => onChange(e, setSuite)} placeholder="Apt, suite" type="text" required />
                                <input value={city} id="city" onChange={e => onChange(e, setCity)} placeholder="City" type="text" required />
                                <div className="row" id="row-correction">
                                    <div className="col-7 state">
                                        <input value={state} id="state" onChange={e => onChangeState(e, setState)} placeholder="State" type="text" required />
                                    </div>
                                    <div className="col-5 zip-code">
                                        <input value={zipCode} id="zipcode" onChange={e => onChange(e, setZipCode)} placeholder="Zip Code" type="text" required />
                                    </div>
                                </div>
                            </section>
                        </section>
                        <section className="col-lg-6 billing">
                            <span>Billing Information</span>
                            <section className="contact-info">
                                <input value={name2} id="name2" onChange={e => onChange(e, setName2)} placeholder="Name" type="text" required />
                                <input value={phone2} id="phone2" onChange={e => onChange(e, setPhone2)} placeholder="Phone" type="text" required />
                                <input value={email2} id="email2" onChange={e => onChange(e, setEmail2)} placeholder="Email" type="text" required />
                                <input value={address2} id="address2" onChange={e => onChange(e, setAddress2)} placeholder="Address" type="text" required />
                                <input value={suite2} id="suite2" onChange={e => onChange(e, setSuite2)} placeholder="Apt, suite" type="text" required />
                                <input value={city2} id="city2" onChange={e => onChange(e, setCity2)} placeholder="City" type="text" required />
                                <div className="row" id="row-correction">
                                    <div className="col-7 state">
                                        <input value={state2} id="state2" onChange={e => onChange(e, setState2)} placeholder="State" type="text" required />
                                    </div>
                                    <div className="col-5 zip-code">
                                        <input value={zipCode2} id="zipcode2" onChange={e => onChange(e, setZipCode2)} placeholder="Zip Code" type="text" required />
                                    </div>
                                </div>
                            </section>
                        </section>
                    </section>
                    {shippingError && <div className="alert alert-danger" id="shipping-alert">{shippingError}</div>}
                    <div className="form-check same-as">
                        <input className="form-check-input" ref={check} type="checkbox" id="check" onChange={isChecked} />
                        <label className="form-check-label" htmlFor="check">
                            Billing Addres same as Shipping Address
                        </label>
                    </div>
                </form>
                {checkout ? 
                    <Payment subtotal={subtotal} discount={discount} freeShipping={freeShipping} shipping={shippingValue} total={total} cart={cart} paypal={showPayPal} />
                    : formLoading ? 
                        <button className="proceed" onClick={proceedToCheckout} disabled>
                            <div className="spinner-border text-secondary" role="status" />
                            PROCEED TO CHECKOUT
                        </button> : 
                        <button className="proceed" onClick={proceedToCheckout}>PROCEED TO CHECKOUT</button>
                }
            </section>
            <section className="col-lg-5 order-sm-1 order-lg-2 cart">
                <span className="my-cart">My Cart</span>
                { cart.map((item, i) => {
                    if (showPayPal && item.joinClub) setShowPayPal(false) 
                    return <section className="row cart-item" id="row-correction" key={i}>
                        <section className="col-lg-5">
                            <img src={item.image} alt="Cart Item" />
                        </section>
                        <section className="col-lg-7">
                            { item.path !== '/fruits' ?
                                <>
                                    <span>{item.name}</span>
                                    <p>{item.bundleUp}-pack.</p>
                                    <p>{item.buyOnce ? ' Once' : ` Club ${item.joinClub}month`}</p>
                                    <p>Amount: {item.amount}</p>
                                    <p>Price: {item.total.toFixed(2)}</p>
                                </> :
                                <>
                                    <span>{item.name}</span>
                                    <p>Bittes: {item.choose1}</p>
                                    {item.choose3.map(smoothie => {
                                        return <p key={smoothie}>
                                            {smoothie[1] !== 0 ? `${smoothie[0]}x${smoothie[1]}` : ''}
                                        </p>
                                    })}
                                    <p>{item.buyOnce ? ' Once' : ` Club ${item.joinClub}month`}</p>
                                    <p>amount: {item.amount}</p>
                                    <p>price: {item.total.toFixed(2)}</p>
                                </>
                            }
                        </section>
                    </section>
                })}
                <section className="receipt">
                    {couponError && <div className="alert alert-danger">{couponError}</div>}
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Coupon Code" value={couponCode} onChange={e => changeCode(e.target.value)} />
                        <button className="btn btn-secondary" type="button" onClick={addCoupon}>Add Coupon</button>
                    </div>
                    <div>
                        <span>Subtotal</span>
                        <span>$ {parseFloat(subtotal).toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Promo Code</span>
                        <span>
                            {discount && <span><span className="form-text">{discountRate}%</span> -$ {discount}</span> }
                        </span>
                    </div>
                    <div>
                        <span>Estimated Shipping</span>
                        <span>
                            {freeShipping ? <span className="form-text">Free Shipping</span> :
                                shippingValue ? <span>$ {shippingValue}</span> : ''}
                        </span>
                    </div>
                    <div>
                        <span>Total</span>
                        <span>
                            $ <span id="checkout-total">{parseFloat(total).toFixed(2)}</span>
                        </span>
                    </div>
                </section>
            </section>
        </section>
    </>
}

export default Checkout
