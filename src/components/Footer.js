import logoOrange from '../assets/img/medium-logo-orange.png'


const Footer = () => {
    return <section className="row home-background-3 mx-auto" id="row-correction">
        <section className="col-xs-12 col-sm-12 col-lg-6 footer-text mt-5 order-2 order-sm-2 order-lg-1">
            <p className="pb-5">We are so glad you are here! Thank you for supporting our small business and helpong us spread some love.</p>
            <i className="bi-facebook icon"></i>
            <i className="bi-instagram icon"></i>
            <i className="bi-envelope-fill icon"></i>
            <p className="pt-5">Kindi Foods LLC<br />Eau Claire, WI 54703</p>
            <p></p>
        </section>
        <section className="col-sx-12 col-sm-12 col-lg-6 footer-form order-1 order-sm-1 order-lg-2">
            <img src={logoOrange} className="form-logo-orange" alt="Cheesy Bittes Medium Logo Orange" />
            <form>
                <input className="form-input" placeholder="Full Name"/><br />
                <input className="form-input" placeholder="Email"/><br />
                <input className="form-input" placeholder="Phone"/><br />
                <textarea className="form-input form-textarea" placeholder="Your Message"></textarea><br />
                <button className="form-submit" type="submit"><strong>Let's Connect!</strong></button>
            </form>
        </section>
    </section>
}

export default Footer