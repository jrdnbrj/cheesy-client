import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"

import background1 from '../assets/img/mix-background-1.png'
import background2 from '../assets/img/mix-background-2.png'
import header from '../assets/img/product-header.png'
import logo from '../assets/img/logo.png'

import dot1 from '../assets/img/product-dot1.png'
import dot2 from '../assets/img/product-dot2.png'

import strawberry from '../assets/img/smoothie-strawberry.png'
import passion from '../assets/img/smoothie-passionfruit.png'
import mango from '../assets/img/smoothie-mango.png'
import blackberry from '../assets/img/smoothie-blackberry.png'
// import bread1 from '../assets/img/bread-1.png'
// import bread2 from '../assets/img/bread-2.png'


const GET_PRODUCT = gql`
    query($path: String!) {
        getProductByPath(path: $path) {
            name
            images
            shortDescription
            ingredients
            price
        }
    }
`

const Products = () => {

    const location = useLocation()
    const { data } = useQuery(GET_PRODUCT, { variables: { path: location.pathname }})

    data && console.log('Fruits:', data.getProductByPath)

    const [sb, setSb] = useState(0)
    const [pf, setPf] = useState(0)
    const [mg, setMg] = useState(0)
    const [ab, setAb] = useState(0)

    const up = (state, set) => {
        if (state < 3) set(state + 1)
    }

    const down = (state, set) => {
        if (state > 0) set(state - 1)
    }

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
        <img src={dot1} className="product-dot" id="product-dot-1" alt="Dot 1" />
        <img src={dot2} className="product-dot" id="product-dot-2" alt="Dot 2" />
        <img src={background1} className="products-header" alt="Products Background" />
        <section className="products-body">
            <section className="row pt-5" id="row-correction">
                <section className="col-lg-6 col-sm-12 products text-center">
                    <div id="mix-carousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {data && data.getProductByPath.images.map((img, index) => {
                                return <div className={`carousel-item ${!index ? 'active' : ''}`} key={index}>
                                    <img src={`${img}`} className="" alt={`Mix Them Up ${index+1}`} />
                                </div>
                            })}
                        </div>
                        <div className="carousel-indicators">
                            {data && data.getProductByPath.images.map((img, index) => {
                                return <button type="button" data-bs-target="#mix-carousel" data-bs-slide-to={index} aria-current="true" 
                                    className={`${!index ? 'active' : ''}`} id="carousel-indicator" key={index}></button>
                            })}
                        </div>
                    </div>
                </section>
                <section className="col-lg-6 col-sm-12 information">
                    <h5>{data && data.getProductByPath.name} Cheesy Bittes</h5>
                    <section className="description">
                        <p>{data && data.getProductByPath.shortDescription}</p>
                        <span>15 Pieces (12.6 OZ)</span>
                    </section>
                    <p id="price">$ {data && data.getProductByPath.price}</p>
                    <div className="dropdown" id="ingredients">
                        <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Ingredients
                        </button>
                        <div className="dropdown-menu">
                            <div className="row" id="row-correction">
                                <div className="col flavor flavor-1">Mozzarella</div>
                                <div className="col flavor flavor-2">Cheddar</div>
                                <div className="col flavor flavor-3">Pepper Jack</div>
                                {data && data.getProductByPath.ingredients.map((ingredient, index) => {
                                    return <div className={`dropdown-text ingredients-${index+1}`} key={index}>
                                        {ingredient}
                                    </div>
                                })}
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
                <section className="col-lg-2 col-sm-6 text-center">
                    <span className="strawberry">Strawberry</span>
                    <img src={strawberry} className="smoothie" alt="Strawberry" />
                    <div className="ingredients-strawberry">
                        Ingredients: Strawberry, Antioxidant (Ascorbic acid). May contain sulfite parts.
                    </div>
                </section>
                <section className="col-lg-2 col-sm-6 text-center">
                    <span className="passion">Passion Fruit</span>
                    <img src={passion} className="smoothie" alt="Pasison" />
                    <div className="passion-strawberry">
                        Ingredients: Passion Fruit, Antioxidant (Ascorbic Acid). May Contain Sulfite Parts.
                    </div>
                </section>
                <section className="col-lg-2 col-sm-6 text-center">
                    <span className="mango">Mango</span>
                    <img src={mango} className="smoothie" alt="Mango" />
                    <div className="mango-strawberry">
                        Ingredients: empty empty empty empty empty empty empty empty empty empty.
                    </div>
                </section>
                <section className="col-lg-2 col-sm-6 text-center">
                    <span className="blackberry">Andean Blackberry</span>
                    <img src={blackberry} className="smoothie" alt="Blackberry" />
                    <div className="blackberry-strawberry">
                        Ingredients: Strawberry, Antioxidant (Ascorbic acid). May contain sulfite parts.
                    </div>
                </section>
                <section className="col smoothie-col"></section>
            </section>
            <section>
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
                    <section className="col-1 choose-1-col"></section>
                    <section className="col-lg-4 col-sm-10 drop-group choose-1">
                        <button className="btn-bundle" id="choose-1" type="button">
                            CHOOSE 1
                        </button>
                        <div className="dropdown-menu show">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="choose" id="radio-button1" />
                                <label className="form-check-label radio-bundle" htmlFor="radio-button1">MOZZARELLA</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="choose" id="radio-button2" />
                                <label className="form-check-label radio-bundle" htmlFor="radio-button2">CHEDDAR</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="choose" id="radio-button3" />
                                <label className="form-check-label radio-bundle" htmlFor="radio-button3">PEPPER JACK</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="choose" id="radio-button4" />
                                <label className="form-check-label radio-bundle" htmlFor="radio-button4">MIX THEM UP!</label>
                            </div>
                        </div>
                    </section>
                    <section className="col-1 choose-1-col"></section>
                    <section className="col-1 choose-3-col"></section>
                    <section className="col-lg-4 col-sm-10 drop-group choose-3">
                        <button className="btn-bundle" id="choose-3" type="button">
                            CHOOSE UP TO 3
                        </button>
                        <div className="dropdown-menu show">
                            <div className="choose-input row" id="row-correction">
                                <div className="col-10">
                                    <span className="radio-bundle">STRAWBERRY</span>
                                </div>
                                <section className="col-2">
                                    <button onClick={() => down(sb, setSb)}>-</button>
                                    <input disabled value={sb} />
                                    <button onClick={() => up(sb, setSb)}>+</button>
                                </section>
                            </div>
                            <div className="choose-input row" id="row-correction">
                                <div className="col-10">
                                    <span className="radio-bundle">PASSION FRUIT</span>
                                </div>
                                <section className="col-2">
                                    <button onClick={() => down(pf, setPf)}>-</button>
                                    <input disabled value={pf} />
                                    <button onClick={() => up(pf, setPf)}>+</button>
                                </section>
                            </div>
                            <div className="choose-input row" id="row-correction">
                                <div className="col-10">
                                    <span className="radio-bundle">MANGO</span>
                                </div>
                                <section className="col-2">
                                    <button onClick={() => down(mg, setMg)}>-</button>
                                    <input disabled value={mg} />
                                    <button onClick={() => up(mg, setMg)}>+</button>
                                </section>
                            </div>
                            <div className="choose-input row" id="row-correction">
                                <div className="col-10">
                                    <span className="radio-bundle">ANDEAN BLACKBERRY</span>
                                </div>
                                <section className="col-2">
                                    <button onClick={() => down(ab, setAb)}>-</button>
                                    <input disabled value={ab} />
                                    <button onClick={() => up(ab, setAb)}>+</button>
                                </section>
                            </div>
                        </div>
                    </section>
                    <section className="col-1 choose-3-col"></section>
                    <section className="col col-hidden"></section>
                </section>
                <section className="row buy" id="row-correction">
                    <section className="col col-hidden"></section>
                    <section className="col-1 once-col"></section>
                    <section className="col-lg-4 col-sm-10 drop-group buy-once">
                        <div>
                            <input type="radio" name="club" id="buy-once-radio" />
                            <label className="btn-bundle text-center" id="buy-once-label" htmlFor="buy-once-radio">
                                BUY ONCE
                            </label>
                        </div>
                    </section>
                    <section className="col-1 once-col"></section>
                    <section className="col-1 join-col"></section>
                    <section className="col-lg-4 col-sm-10 drop-group join-the-club">
                        <button className="btn-bundle" id="club" type="button">
                            JOIN THE CLUB!
                        </button>
                        <div className="dropdown-menu show">
                            <span className="ship">SHIP EVERY:</span>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="club" id="radio-button5" />
                                <label className="form-check-label radio-bundle" htmlFor="radio-button5">MONTH</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="club" id="radio-button6" />
                                <label className="form-check-label radio-bundle" htmlFor="radio-button6">2 MONTHS</label>
                            </div>
                        </div>
                    </section>
                    <section className="col-1 join-col"></section>
                    <section className="col col-hidden"></section>
                </section>
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