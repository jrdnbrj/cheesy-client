import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"
import { useDispatch } from 'react-redux'

import Modal from '../components/Modal'

import background1 from '../assets/img/mix-background-1.png'
import background2 from '../assets/img/mix-background-2.png'
import header from '../assets/img/product-header.png'
import logo from '../assets/img/logo.png'
import dot1 from '../assets/img/product-dot1.png'
import dot2 from '../assets/img/product-dot2.png'


const GET_PRODUCT = gql`
    query ($path: String!) {
        getProductByPath(path: $path) {
            name
            images
            shortDescription
            ingredients
            price
        }
    }
`

const Product = () => {

    const modal = document.getElementById('modal-product')
    const [modalOptions, setModalOptions] = useState({})

    const dispatch = useDispatch()
    const location = useLocation()
    const path = location.pathname
    const { data } = useQuery(GET_PRODUCT, { variables: { path }})

    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        data && setPrice(data.getProductByPath.price)
    }, [data])

    useEffect(() => {
        const toDo = () => {
            if(radio1.checked || radio2.checked) bundleUp.className += ' checked'
            else bundleUp.classList.remove('checked')

            if (radio1.checked) setTotal(price * 6)
            if (radio2.checked) setTotal(price * 9)
        }

        const radio1 = document.getElementById('radio-button1')
        const radio2 = document.getElementById('radio-button2')
        const bundleUp = document.getElementById('bundle-up')

        radio1.addEventListener('change', toDo)
        radio2.addEventListener('change', toDo)
        bundleUp.addEventListener('change', toDo)

    })

    useEffect(() => {
        const toDo = () => {
            if(radio3.checked || radio4.checked) button.className += ' checked'
            else button.classList.remove('checked')
        }

        const radio3 = document.getElementById('radio-button3')
        const radio4 = document.getElementById('radio-button4')
        const buyOnce = document.getElementById('buy-once-radio')
        const button = document.getElementById('club')

        radio3.addEventListener('change', toDo)
        radio4.addEventListener('change', toDo)
        buyOnce.addEventListener('change', toDo)
    })

    const addToCart = () => {
        const payload = { 
            path,
            amount: 1,
            price: parseFloat(total),
            image: data.getProductByPath.images[0],
            name: data.getProductByPath.name,
            total: parseFloat(total)
        }

        const radio1 = document.getElementById('radio-button1')
        const radio2 = document.getElementById('radio-button2')
        const radio3 = document.getElementById('radio-button3')
        const radio4 = document.getElementById('radio-button4')
        const buyOnce = document.getElementById('buy-once-radio')

        if (radio1.checked || radio2.checked)
            payload['bundleUp'] = radio1.checked ? 6 : radio2.checked ? 9 : 0
        else  {
            modal.style.display = 'block'
            return setModalOptions({
                header: 'Add to Cart',
                body: 'You must choose a BUNDLE UP option.',
            })
        }

        if (radio3.checked || radio4.checked || buyOnce.checked) {
            payload['buyOnce'] = buyOnce.checked
            payload['joinClub'] = radio3.checked ? 1 : radio4.checked ? 2 : false
        } else { 
            modal.style.display = 'block'
            return setModalOptions({
                header: 'Add to Cart',
                body: 'You must choose if you want to BUY ONCE or if you want to JOIN THE CLUB!',
            })
        }

        setModalOptions({
            header: 'Add to Cart',
            body: 'Item added to cart',
        })
        modal.style.display = 'block'

        console.log('Payload:', payload)
        dispatch({ type: 'APPEND_TO_CART', payload })
    }

    return <>
        <Modal id="modal-product" {...modalOptions} />
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
                    <p id="price">$ {parseFloat(total).toFixed(2)}</p>
                    <div className="dropdown" id="ingredients">
                        <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Ingredients
                        </button>
                        <div className="dropdown-menu">
                            <div className="row" id="row-correction">
                                { location.pathname === '/mix' ? 
                                    <>
                                        <div className="col flavor flavor-1">Mozzarella</div>
                                        <div className="col flavor flavor-2">Cheddar</div>
                                        <div className="col flavor flavor-3">Pepper Jack</div>
                                        {data && data.getProductByPath.ingredients.map((ingredient, index) => {
                                            return <div className={`dropdown-text ingredients-${index+1}`} key={index}>
                                                {ingredient}
                                            </div>
                                        })}
                                    </> : <div className="dropdown-text ingredients-1">{data && data.getProductByPath.ingredients}</div>
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
                <section className="col-12 col-lg-4 col-sm-12 club-group btn-group" id="bundleUpDropdown">
                    <button className="btn-radio" id="bundle-up" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                        BUNDLE UP
                    </button>
                    <div className="dropdown-menu">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="bundle-up" id="radio-button1" />
                            <label className="form-check-label radio-text" htmlFor="radio-button1" id="pack-6">
                                6 PACK
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="bundle-up" id="radio-button2" />
                            <label className="form-check-label radio-text" htmlFor="radio-button2" id="pack-9">
                                9 PACK
                            </label>
                        </div>
                    </div>
                </section>
                <section className="col-12 col-lg-4 col-sm-12 club-group" id="buy-once">
                    <div>
                        <input type="radio" name="club" id="buy-once-radio" />
                        <label className="btn-radio text-center" id="buy-once-label" htmlFor="buy-once-radio">BUY ONCE</label>
                    </div>
                </section>
                <section className="col col-hidden"></section>
            </section>
            <section className="row join-club" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col-lg-4"></section>
                <section className="col-12 col-lg-4 col-sm-12 club-group">
                    <button className="btn-radio" type="button" id="club" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                        JOIN THE CLUB!
                    </button>
                    <div className="dropdown-menu">
                        <span className="ship">SHIP EVERY:</span>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="club" id="radio-button3" />
                            <label className="form-check-label radio-text" htmlFor="radio-button3">MONTH</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="club" id="radio-button4" />
                            <label className="form-check-label radio-text" htmlFor="radio-button4">2 MONTHS</label>
                        </div>
                    </div>
                </section>
                <section className="col col-hidden"></section>
            </section>

            <section className="address py-5">
                <button className="btn-add" onClick={addToCart}>ADD TO CART</button>
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
