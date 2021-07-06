import { createRef } from 'react'
import logoOrange from '../assets/img/medium-logo-orange.png'
import { useMutation, gql } from "@apollo/client"


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

const Footer = () => {

    const fullName = createRef()
    const email = createRef()
    const phone = createRef()
    const message = createRef()

    const [createContact, { loading, error }] = useMutation(CREATE_CONTACT)

    loading && console.log('Loading...')
    error && console.log('Error Create Contact:', error)

    const saveContact = e => {
        e.preventDefault()
        console.log(fullName.current.value, email.current.value, phone.current.value, message.current.value)

        createContact({
            variables: {
                fullName: fullName.current.value,
                email: email.current.value,
                phone: phone.current.value,
                message: message.current.value,
            }
        })

        alert("We will contact you as soon as possible")

        document.getElementById("footer-form").reset();
    }

    return <>
        <section className="row home-background-3 mx-auto" id="row-correction">
            <section className="col-xs-12 col-sm-12 col-lg-6 footer-text order-2 order-sm-2 order-lg-1">
                <address>
                    <p className="pb-5">We are so glad you are here! Thank you for supporting our small business and helping us spread some love.</p>
                    <a href="https://www.facebook.com/Cheesybittes/" target="_blank" rel="noreferrer">
                        <i className="bi-facebook icon"></i>
                    </a>
                    <a href="https://www.instagram.com/cheesybittes/" target="_blank" rel="noreferrer">
                        <i className="bi-instagram icon"></i>
                    </a>
                    <a href="mailto:info@cheesybittes.com"><i className="bi-envelope-fill icon"></i></a>
                    <p className="pt-5">Kindi Foods LLC<br />Eau Claire, WI 54703</p>
                </address>
            </section>
            <section className="col-sx-12 col-sm-12 col-lg-6 footer-form order-1 order-sm-1 order-lg-2">
                <img src={logoOrange} className="form-logo-orange" alt="Cheesy Bittes Medium Logo Orange" />
                <form onSubmit={e => saveContact(e)} id="footer-form">
                    <input ref={fullName} className="form-input" type="text" placeholder="Full Name" required />
                    <input ref={email} className="form-input" type="email" placeholder="Email" required />
                    <input ref={phone} className="form-input" type="text" placeholder="Phone" required />
                    <textarea ref={message} className="form-input form-textarea" placeholder="Your Message" required/>
                    <button className="form-submit" type="submit"><strong>Let's Connect!</strong></button>
                </form>
            </section>
        </section>
    </>
}

export default Footer
