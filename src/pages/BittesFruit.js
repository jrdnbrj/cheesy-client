import { useEffect } from 'react'

import background1 from '../assets/img/mix-background-1.png'
import background2 from '../assets/img/mix-background-2.png'
import header from '../assets/img/product-header.png'
import logo from '../assets/img/logo.png'
import bittesFruit from '../assets/img/product-bittes-fruits.png'

import strawberry from '../assets/img/smoothie-strawberry.png'
import passion from '../assets/img/smoothie-passionfruit.png'
import mango from '../assets/img/smoothie-mango.png'
import blackberry from '../assets/img/smoothie-blackberry.png'
// import bread1 from '../assets/img/bread-1.png'
// import bread2 from '../assets/img/bread-2.png'


const Products = () => {

    useEffect(() => {
        const toDo = () => {
            if(radio5.checked || radio6.checked) button.className += ' checked'
            else button.classList.remove('checked')
        }

        const radio5 = document.getElementById('radio-button5')
        const radio6 = document.getElementById('radio-button6')
        const radio3 = document.getElementById('buy-once-radio')
        const button = document.getElementById('club')

        radio5.addEventListener('change', toDo)
        radio6.addEventListener('change', toDo)
        radio3.addEventListener('change', toDo)
    })

    useEffect(() => {
        const toDo = () => {
            if(radio1.checked || radio2.checked || radio3.checked || radio4.checked) 
                button.className += ' checked'
        }

        const radio1 = document.getElementById('radio-button1')
        const radio2 = document.getElementById('radio-button2')
        const radio3 = document.getElementById('radio-button3')
        const radio4 = document.getElementById('radio-button4')
        const button = document.getElementById('choose-1')
        
        radio1.addEventListener('change', toDo)
        radio2.addEventListener('change', toDo)
        radio3.addEventListener('change', toDo)
        radio4.addEventListener('change', toDo)

    })

    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={background1} className="products-header" alt="Products Background" />
        <section className="products-body">
            <section className="row pt-5" id="row-correction">
                <section className="col-lg-6 col-sm-12 products text-center">
                    <div id="mix-carousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={bittesFruit} className="" alt="Bittes & Fruit" />
                            </div>
                        </div>
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#mix-carousel" data-bs-slide-to="0" aria-current="true" className="active" id="carousel-indicator"></button>
                            {/* <button type="button" data-bs-target="#mix-carousel" data-bs-slide-to="1" aria-current="true" className="active" id="carousel-indicator"></button> */}
                        </div>
                    </div>
                </section>
                <section className="col-lg-6 col-sm-12 information">
                    <h5>Bittes & Fruit Pulp Cheesy Bittes</h5>
                    <section className="description">
                        <p>Our Cheesy Bittes and natural fruit pulp are made for each other.</p>
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
                                <div className="col flavor flavor-2">Cheddar</div>
                                <div className="col flavor flavor-3">Pepper Jack</div>
                                <div className="dropdown-text ingredients-1">
                                    Low moisture part skim mozzarella (pasteurized milk, cheese cultures, salt, enzymes, cellulose), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.
                                </div>
                                <div className="dropdown-text ingredients-2">
                                    Cheddar cheese (cultured pasteurized milk, salt, enzymes, annatto (color), cellulose, dextrose, natamycin (a natural mold inhibitor), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.
                                </div>
                                <div className="dropdown-text ingredients-3">
                                    Pepper jack cheese (pasteurized milk, cultures, jalapeno peppers, salt, enzymes), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.
                                </div>
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
            <section className="row smoothies mt-5" id="row-correction">
                <section className="col smoothie-col"></section>
                <section className="col-lg-2 text-end">
                    <span className="strawberry">Strawberry</span>
                    <img src={strawberry} className="smoothie" alt="Strawberry" />
                </section>
                <section className="col-lg-2 text-end">
                    <span className="passion">Passion Fruit</span>
                    <img src={passion} className="smoothie" alt="Pasison" />
                </section>
                <section className="col-lg-2 text-end">
                    <span className="mango">Mango</span>
                    <img src={mango} className="smoothie" alt="Mango" />
                </section>
                <section className="col-lg-2 text-end">
                    <span className="blackberry">Andean Blackberry</span>
                    <img src={blackberry} className="smoothie" alt="Blackberry" />
                </section>
                <section className="col smoothie-col"></section>
            </section>
            <section className="row drops" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col-12 col-lg-10 col-sm-12 bundle-up">
                    <button className="btn-bundle" type="button">
                        BUNDLE UP
                    </button>
                </section>
                <section className="col col-hidden"></section>
            </section>
            <section className="row choose" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col-lg-4 drop-group">
                    <button className="btn-bundle" id="choose-1" type="button">
                        CHOOSE 1
                    </button>
                    <div className="dropdown-menu show">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="choose" id="radio-button1" />
                            <label className="form-check-label radio-text" htmlFor="radio-button1">MOZZARELLA</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="choose" id="radio-button2" />
                            <label className="form-check-label radio-text" htmlFor="radio-button2">CHEDDAR</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="choose" id="radio-button3" />
                            <label className="form-check-label radio-text" htmlFor="radio-button3">PEPPER JACK</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="choose" id="radio-button4" />
                            <label className="form-check-label radio-text" htmlFor="radio-button4">MIX THEM UP!</label>
                        </div>
                    </div>
                </section>
                <section className="col-lg-4 drop-group">
                    <button className="btn-bundle" id="choose-3" type="button">
                        CHOOSE UP TO 3
                    </button>
                    <div className="dropdown-menu show">
                        <div className="choose-input">
                            <label className="form-check-label radio-text">STRAWBERRY</label>
                        </div>
                        <div className="choose-input">
                            <label className="form-check-label radio-text">PASSION FRUIT</label>
                        </div>
                        <div className="choose-input">
                            <label className="form-check-label radio-text">MANGO</label>
                        </div>
                        <div className="choose-input">
                            <label className="form-check-label radio-text">ANDEAN BLACKBERRY</label>
                        </div>
                    </div>
                </section>
                <section className="col col-hidden"></section>
            </section>
            <section className="row buy" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col-lg-4 drop-group">
                    <div>
                        <input type="radio" name="club" id="buy-once-radio" />
                        <label className="btn-bundle text-center" id="buy-once-label" htmlFor="buy-once-radio">
                            BUY ONCE
                        </label>
                    </div>
                </section>
                <section className="col-lg-4 drop-group">
                    <button className="btn-bundle" id="club" type="button">
                        JOIN THE CLUB!
                    </button>
                    <div className="dropdown-menu show">
                        <span className="ship">SHIP EVERY:</span>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="club" id="radio-button5" />
                            <label className="form-check-label radio-text" htmlFor="radio-button5">MONTH</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="club" id="radio-button6" />
                            <label className="form-check-label radio-text" htmlFor="radio-button6">2 MONTHS</label>
                        </div>
                    </div>
                </section>
                <section className="col col-hidden"></section>
            </section>
            <section className="address-fruit py-5">
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