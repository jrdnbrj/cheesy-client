import background1 from '../assets/img/mix-background-1.png'
import background2 from '../assets/img/mix-background-2.png'
import header from '../assets/img/product-header.png'
import logo from '../assets/img/logo.png'
import cheddar from '../assets/img/products-cheddar.png'
import nutritionFacts from '../assets/img/nutrition-facts.png'


const Cheddar = () => {
    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={background1} className="products-header" alt="Products Background" />
        <section className="products-body">
            <section className="row pt-5" id="row-correction">
                <section className="col-lg-6 col-sm-12 products text-center">
                    <div id="mix-carousel" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={cheddar} className="" alt="Mix Them Up 1" />
                            </div>
                            <div class="carousel-item">
                                <img src={nutritionFacts} className="" alt="Mix Them Up 2" />
                            </div>
                        </div>
                    </div>
                    
                </section>
                <section className="col-lg-6 col-sm-12 information">
                    <h5>Cheddar Cheesy Bittes</h5>
                    <section className="description">
                        <p>Smooth, rich, and buttery! Our Cheesy Bittes are perfect to share with loved ones. The sharp cheddar flavor is delightful. Pair them with coffee, fruit, or nuts. You will be amazed!</p>
                        <p>Frozen, ready to bake</p>
                        <span>15 Pieces (12.6 OZ)</span>
                    </section>
                    <p id="price">$ 5.45</p>
                    <div className="dropdown" id="ingredients">
                        <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Ingredients
                        </button>
                        <div className="dropdown-menu">
                            <div className="row" id="row-correction">
                                <div className="col flavor flavor-1">Mozzarella</div>
                                <div className="col flavor flavor-2">Pepper Jack</div>
                                <div className="col flavor flavor-3">Cheddar</div>
                                <div className="dropdown-text ingredients-1">Low moisture part skim mozzarella (pasteurized milk, cheese cultures, salt, enzymes, cellulose), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.</div>
                                <div className="dropdown-text ingredients-2">Pepper jack cheese (pasteurized milk, cultures, jalapeno peppers, salt, enzymes), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.</div>
                                <div className="dropdown-text  ingredients-3">Cheddar cheese (cultured pasteurized milk, salt, enzymes, annatto (color), cellulose, dextrose, natamycin (a natural mold inhibitor), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.</div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown" id="allergen">
                        <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Allergen Information
                        </button>
                        <div className="dropdown-menu dropdown-text">
                            Contains eggs, milk.<br /><br />
                            Manufactured in a facility that also processes peanuts, soy, almonds, cashews, walnuts, pecans, coconut and wheat. 
                        </div>
                    </div>
                </section>
            </section>
            <section className="row mt-5" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col col-lg-3 col-sm-12 club-group">
                    <button class="btn-radio" data-bs-toggle="dropdown">BUNDLE UP</button>
                    <div class="dropdown-menu">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadio1" id="radio-button" />
                            <label class="form-check-label radio-text">6 PACK</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadio1" id="radio-button" />
                            <label class="form-check-label radio-text">9 PACK</label>
                        </div>
                    </div>
                </section>
                <section className="col col-lg-3 col-sm-12 club-group">
                    <button className="btn-radio">BUY ONCE</button>
                </section>
                <section className="col col-lg-3 col-sm-12 club-group">
                    <button class="btn-radio" data-bs-toggle="dropdown">JOIN THE CLUB!</button>
                    <div class="dropdown-menu">
                        <span className="ms-4">SHIP EVERY:</span>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadio1" id="radio-button" />
                            <label class="form-check-label radio-text">MONTH</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadio1" id="radio-button" />
                            <label class="form-check-label radio-text">2 MONTHS</label>
                        </div>
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

export default Cheddar