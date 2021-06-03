import background1 from '../assets/img/contact-background-1.png'
import header from '../assets/img/contact-header.jpeg'
import logo from '../assets/img/logo.png'
import logoOrange from '../assets/img/medium-logo-white.png'


const Contact = () => {
    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={background1} className="contact-header" alt="Products Background" />
        <section className="row contact-background mx-auto" id="row-correction">
            <section className="col-xs-12 col-sm-12 col-lg-6 contact-text order-2 order-sm-2 order-lg-1">
                <address>
                    <p className="pb-5">We are so glad you are here! Thank you for supporting our small business and helping us spread some love.</p>
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
                <form>
                    <input className="contact-form-input" placeholder="Full Name"/><br />
                    <input className="contact-form-input" placeholder="Email"/><br />
                    <input className="contact-form-input" placeholder="Phone"/><br />
                    <textarea className="contact-form-input form-textarea" placeholder="Your Message"></textarea><br />
                    <button className="contact-form-submit" type="submit"><strong>Let's Connect!</strong></button>
                </form>
            </section>
        </section>
    </>
}

export default Contact