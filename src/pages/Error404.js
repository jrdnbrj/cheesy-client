import background1 from '../assets/img/contact-background-1.png'
import header from '../assets/img/contact-header.jpeg'
import logo from '../assets/img/logo.png'
import dot1 from '../assets/img/contact-dot1.png'
import dot2 from '../assets/img/contact-dot2.png'


const Error404 = () => {
    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={dot1} className="contact-dot" id="contact-dot-1" alt="Dot 1" />
        <img src={dot2} className="contact-dot" id="contact-dot-2" alt="Dot 2" />
        <img src={background1} className="contact-header" alt="Products Background" />
        <section className="row contact-background mx-auto" id="row-correction">
            <p className="msg-404">The page you are trying to find does not exist &#128579;</p>
        </section>
    </>
}

export default Error404
