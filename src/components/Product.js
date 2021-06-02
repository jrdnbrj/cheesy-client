import background1 from '../assets/img/mix-background-1.png'
import background2 from '../assets/img/mix-background-2.png'
import header from '../assets/img/product-header.png'
import logo from '../assets/img/logo.png'


const Product = ({ carousel, name, description, ingredients }) => {
    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={background1} className="products-header" alt="Products Background" />
        <section className="products-body">
            <section className="row pt-5" id="row-correction">
                <section className="col-lg-6 col-sm-12 products text-center">
                    <div id="mix-carousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {carousel.map((img, index) => {
                                return <div className={`carousel-item ${!index ? 'active' : ''}`}>
                                    <img src={img} className="" alt={`Mix Them Up ${index}`} />
                                </div>
                            })}
                        </div>
                    </div>
                </section>
                <section className="col-lg-6 col-sm-12 information">
                    <h5>{name} Cheesy Bittes</h5>
                    <section className="description">
                        <p>{description}</p>
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
                                { name === 'Mix them up!' ? 
                                    <>
                                        <div className="col flavor flavor-1">Mozzarella</div>
                                        <div className="col flavor flavor-2">Cheddar</div>
                                        <div className="col flavor flavor-3">Pepper Jack</div>
                                        {ingredients.map((ingredient, index) => {
                                            return <div className={`dropdown-text ingredients-${index+1}`}>
                                                {ingredient}
                                            </div>
                                        })}
                                    </> : <div className="dropdown-text  ingredients-1">{ingredients}</div>
                                }
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
            <section className="row drops" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col-12 col-lg-3 col-sm-12 club-group">
                    <button className="btn-radio" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">BUNDLE UP</button>
                    <div className="dropdown-menu">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="bundle-up" id="radio-button1" />
                            <label className="form-check-label radio-text" for="radio-button1">6 PACK</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="bundle-up" id="radio-button2" />
                            <label className="form-check-label radio-text" for="radio-button2">9 PACK</label>
                        </div>
                    </div>
                </section>
                <section className="col-12 col-lg-3 col-sm-12 club-group">
                    <button className="btn-radio">BUY ONCE</button>
                </section>
                <section className="col-12 col-lg-3 col-sm-12 club-group">
                    <button className="btn-radio" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">JOIN THE CLUB!</button>
                    <div className="dropdown-menu">
                        <span className="ship">SHIP EVERY:</span>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="club" id="radio-button3" />
                            <label className="form-check-label radio-text" for="radio-button3">MONTH</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="club" id="radio-button4" />
                            <label className="form-check-label radio-text" for="radio-button4">2 MONTHS</label>
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

export default Product