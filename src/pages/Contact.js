import { createRef, useState, useEffect } from 'react'
import { useMutation, gql } from "@apollo/client"

import background1 from '../assets/img/contact-background-1.png'
import header from '../assets/img/contact-header.jpeg'
import logo from '../assets/img/logo.png'
import logoOrange from '../assets/img/medium-logo.png'
import dot1 from '../assets/img/contact-dot1.png'
import dot2 from '../assets/img/contact-dot2.png'

import Modal from '../components/Modal'
import { loadScript } from "@paypal/paypal-js"


const CREATE_CONTACT = gql`
    mutation ($fullName: String, $email: String, $phone: String, $message: String) {
        createContact(fullName: $fullName, email: $email, phone: $phone, message: $message) {
            fullName
            email
            phone
            message
        }
    }
`

const Contact = () => {
    
    const [modalOptions, setModalOptions] = useState({})
    
    const fullName = createRef()
    const email = createRef()
    const phone = createRef()
    const message = createRef()

    const [createContact, { error }] = useMutation(CREATE_CONTACT)

    error && alert('An unexpected error occurred, please try again.')

    useEffect(() => {
        loadScript({ 
            'client-id': 'AYJPPVW7DLJ6bCDexWjlveGFEuyqNklD6vndKp8T-4nRemjrQFqv73kk87aqHgaXGHb0lHpt0BFR_5xz', 
            'vault': true, 
            'intent': 'subscription' 
        }).then(paypal => {
            paypal.Buttons({
                style: {
                    color: 'gold',
                    shape: 'pill',
                    size: 'responsive',
                    layout: 'horizontal',
                    label: 'checkout',
                    // tagline: false
                },
                createSubscription: function(data, actions) {
                    console.log('Create Subscription.')
                    const response =  actions.subscription.create({
                        "plan_id": "P-8MN77060VY799034YMDWT3JY",
                        // "shipping_amount": {
                        //     "currency_code": "USD",
                        //     "value": "10.00"
                        // },
                        "application_context": {
                            "brand_name": "Cheesy Bittes",
                            "user_action": "SUBSCRIBE_NOW",
                            "return_url": "https://cheesybittes.netlify.app/checkout",
                            "cancel_url": "https://cheesybittes.netlify.app/checkout"
                        }
                    });
                    return response
                },
                onApprove: function(data, actions) {
                    console.log('Subscription Approve.')
                    console.log(data)
                    console.log(data.subscriptionID)
                },
                onError: function(error) {
                    console.log('Subscription Error:', error)
                },
                onCancel: function () {
                    console.log('Subscription Cancelled.')
                },
            }).render('#paypal-button-subscription')
        }).catch(err => {
            console.error("failed to load the PayPal JS SDK script", err)
        })
    })

    const saveContact = e => {
        e.preventDefault()
        // console.log(fullName.current.value, email.current.value, phone.current.value, message.current.value)

        createContact({
            variables: {
                fullName: fullName.current.value,
                email: email.current.value,
                phone: phone.current.value,
                message: message.current.value,
            }
        })

        setModalOptions({
            header: 'Contact Information',
            body: 'Thank you for your interest in Cheesy Bittes. We will contact you as soon as possible.',
        })

        const modal = document.getElementById('modal-contact')
        modal.style.display = 'block'

        document.getElementById("footer-form").reset();
    }

    return <>
        <Modal id="modal-contact" {...modalOptions} />
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={dot1} className="contact-dot" id="contact-dot-1" alt="Dot 1" />
        <img src={dot2} className="contact-dot" id="contact-dot-2" alt="Dot 2" />
        <img src={background1} className="contact-header" alt="Products Background" />
        <section className="row contact-background mx-auto" id="row-correction">
            <section className="col-xs-12 col-sm-12 col-lg-6 contact-text order-2 order-sm-2 order-lg-1">
                <div id="paypal-button-subscription"></div>
                <address>
                    <p className="pb-5">We make our cheesy bittes with love and hope they make you smile! 
                    <br />If you have any questions or just want to chat, let us know
                    </p>
                    <a href="https://www.facebook.com/Cheesybittes/" target="_blank" rel="noreferrer">
                        <i className="bi-facebook contact-icon"></i>
                    </a>
                    <a href="https://www.instagram.com/cheesybittes/" target="_blank" rel="noreferrer">
                        <i className="bi-instagram contact-icon"></i>
                    </a>
                    <a href="mailto:info@cheesybittes.com"><i className="bi-envelope-fill contact-icon"></i></a>
                    <p className="pt-5">Kindi Foods LLC<br />Eau Claire, WI 54703</p>
                </address>
            </section>
            <section className="col-sx-12 col-sm-12 col-lg-6 contact-form order-1 order-sm-1 order-lg-2">
                <img src={logoOrange} className="form-logo-orange" alt="Cheesy Bittes Medium Logo Orange" />
                <form onSubmit={e => saveContact(e)} id="footer-form">
                    <input ref={fullName} className="contact-form-input" placeholder="Full Name" required />
                    <input ref={email} className="contact-form-input" placeholder="Email" required />
                    <input ref={phone} className="contact-form-input" placeholder="Phone" required />
                    <textarea ref={message} className="contact-form-input form-textarea" placeholder="Your Message" required />
                    <button className="contact-form-submit" type="submit"><strong>Let's Connect!</strong></button>
                </form>
            </section>
        </section>
    </>
}

export default Contact
