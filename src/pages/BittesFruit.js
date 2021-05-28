import background1 from '../assets/img/products-background-1.png'
import background2 from '../assets/img/products-background-2.png'
import header from '../assets/img/product-header.png'
import logo from '../assets/img/logo.png'
import bittesFruit from '../assets/img/product-bittes-fruits.png'

import strawberry from '../assets/img/strawberry.png'
import passion from '../assets/img/passion.png'
import soursop from '../assets/img/soursop.png'
import blackberry from '../assets/img/blackberry.png'
// import bread1 from '../assets/img/bread-1.png'
// import bread2 from '../assets/img/bread-2.png'


const Products = () => {
    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={background1} className="products-header" alt="Products Background" />
        <section className="products-body">
            <section className="row pt-5" id="row-correction">
                <section className="col-lg-5 col-sm-12 products">
                    <img src={bittesFruit} className="products-header" alt="Products Background" />
                </section>
                <section className="col-lg-7 col-sm-12 information">
                    <h5>Bittes & Fruit</h5>
                    <section className="description">
                        <span>Descripción</span><br />
                        <span>Frozen, ready to bake</span><br />
                        <span>15 Pieces (12 OZ)</span>
                    </section>
                    <p id="price">$ 5.45</p>
                    <div className="dropdown" id="ingredients">
                        <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Ingredients
                        </button>
                        <div className="dropdown-menu">
                            <div className="row" id="row-correction">
                                <div className="col flavor">Mozzarella</div>
                                <div className="col flavor">Pepper Jack</div>
                                <div className="col flavor">Cheddar</div>
                            </div>
                            <div className="dropdown-text">Low moisture part skim mozzarella (pasteurized milk, cheese cultures, salt, enzymes, cellulose), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.</div>
                        </div>
                    </div>
                    <div className="dropdown" id="allergen">
                        <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Allergen Information
                        </button>
                        <div className="dropdown-menu dropdown-text">
                            Contains eggs, milk.<br /><br />
                            Manufactured in a facility that also processes peanuts, soy, almonds, cashews, walnuts, pecans, coconut and wheat. 
                            {/* <img src={bread1} className="bread-1" alt="Bread" /> */}
                        </div>
                    </div>
                </section>
            </section>
            <section className="row juices mt-5" id="row-correction">
                <section className="col"></section>
                <section className="col text-center">
                    <span>Strawberry</span>
                    <img src={strawberry} className="" alt="Strawberry" />
                </section>
                <section className="col text-center">
                    <span>Passion Fruit</span>
                    <img src={passion} className="" alt="Pasison" />
                </section>
                <section className="col text-center">
                    <span>Soursop</span>
                    <img src={soursop} className="" alt="Soursop" />
                </section>
                <section className="col text-center">
                    <span>Andean Blackberry</span>
                    <img src={blackberry} className="" alt="Blackberry" />
                </section>
                <section className="col">
                </section>
            </section>
            <section className="row mt-5" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col col-lg-3 col-sm-12 club-group">
                    <span className="btn-radio">BUNDLE UP</span>
                    <div class="form-check mt-4">
                        <input class="form-check-input" type="radio" name="flexRadio1" id="radio-button" />
                        <label class="form-check-label radio-text">6 PACK</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadio1" id="radio-button" />
                        <label class="form-check-label radio-text">9 PACK</label>
                    </div>
                </section>
                <section className="col col-lg-3 col-sm-12 club-group">
                    <span className="btn-radio">BUY ONCE</span>
                </section>
                <section className="col col-lg-3 col-sm-12 club-group">
                    <span className="btn-radio">JOIN THE CLUB!</span><br />
                    <span className="ship">SHIP EVERY:</span>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadio2" id="radio-button" />
                        <label class="form-check-label radio-text">MONTH</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadio2" id="radio-button" />
                        <label class="form-check-label radio-text">2 MONTHS</label>
                    </div>
                </section>
                <section className="col col-hidden"></section>
            </section>
            <section className="address py-5">
                <button className="btn-add">ADD TO CART</button>
                <address>
                    <p>If you live within 10 miles of Eau Claire (54703) we will deliver to your door for free.</p>
                    <span>DM us!</span>
                    <a href="https://www.facebook.com/Cheesybittes/" target="_blank" rel="noreferrer">
                        <i className="bi-facebook icon-2"></i>
                    </a>
                    <a href="https://www.instagram.com/cheesybittes/" target="_blank" rel="noreferrer">
                        <i className="bi-instagram icon-2"></i>
                    </a>
                    <a href="mailto:info@cheesybittes.com"><i className="bi-envelope-fill icon-2"></i></a>
                </address>
            </section>
        </section>
        <img src={background2} className="products-header-2" alt="Products Background" />
    </>
}

export default Products