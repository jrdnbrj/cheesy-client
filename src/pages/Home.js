import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import backgroundHover from '../assets/img/background-hover.png'
import homeHeader1 from '../assets/img/home-header-1.jpg'
import homeHeader2 from '../assets/img/home-header-2.jpg'
import homeHeader3 from '../assets/img/home-header-3.jpg'
import background4 from '../assets/img/home-background-4.png'
import background3 from '../assets/img/home-background-3.png'
import logo from '../assets/img/logo.png'
import mozzarella from '../assets/img/mozzarella-box.png'
import cheddar from '../assets/img/cheddar-box.png'
import pepperJack from '../assets/img/pepper-jack-box.png'
import rightArrow from '../assets/img/arrow-right.png'
import leftArrow from '../assets/img/arrow-left.png'
import shopNowShadow from '../assets/img/shop-now-shadow.png'
import homeEnd from '../assets/img/home-background-2.png'
// import loadingGif from '../assets/img/loading.gif'

import simpleIngredients from '../assets/img/simple-ingredients.png'
import vegetarianFriendly from '../assets/img/vegetarian-friendly.png'
import wisconsin from '../assets/img/wisconsin.png'
import fifteenPieces from '../assets/img/15-pieces.png'
import glutenFree from '../assets/img/gluten-free.png'

import breadChocolate from '../assets/img/bread-chocolate.png'
import breadCoffee from '../assets/img/bread-coffee.png'
import breadFruits from '../assets/img/bread-fruits.png'
import breadPizza from '../assets/img/bread-pizza.png'
import breadPlate from '../assets/img/bread-plate.png'
import breadSandwich from '../assets/img/bread-sandwich.png'

import Flickity from 'react-flickity-component'


const Home = () => {

    useEffect(() => {
        const hover1 = document.getElementById('hover-1')
        const hover2 = document.getElementById('hover-2')
        const hover3 = document.getElementById('hover-3')
        const hovers = [hover1, hover2, hover3]
        
        let x = 0;

        const carousel = document.getElementById('home-carousel')

        carousel.addEventListener('slide.bs.carousel', () => {
            if (x > 1) x = 0; else x++
            hovers.map(hover => hover.classList.remove('hover-active'))
            hovers[x].classList.add('hover-active')
        })
    })

    return <>
        <section className="home-background">
            <section>
                <div id="carousel-header" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={homeHeader1} className="d-block home-header" alt="Home Header 1" />
                        </div>
                        <div className="carousel-item">
                            <img src={homeHeader2} className="d-block home-header" alt="Home Header 2" />
                        </div>
                        <div className="carousel-item">
                            <img src={homeHeader3} className="d-block home-header" alt="Home Header 3" />
                        </div>
                    </div>
                </div>
                <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
            </section>
            <div id="home-carousel" className="carousel slide" data-bs-ride="carousel">
                <img src={background4} className="background-1" alt="background" />
                <section className="space-1"></section>
                <div className="carousel-inner carousel-container">
                    <div className="carousel-item active">
                        <img src={mozzarella} className="d-block carousel-img mx-auto" alt="Mozzarella Box" />
                    </div>
                    <div className="carousel-item">
                        <img src={cheddar} className="d-block carousel-img mx-auto" alt="Cheddar Box" />
                    </div>
                    <div className="carousel-item">
                        <img src={pepperJack} className="d-block carousel-img mx-auto" alt="Pepper Jack Box" />
                    </div>
                </div>
                <section className="hover-container">
                    <img src={backgroundHover} className="background-hover" alt="background Hover" />
                    <section id="hover-1" className="hover-active">
                        <p className="hover-text">Inspired by Ecuador's traditional pan de yuca and delish Wisconsin cheese, our cheesy bittes are like nothing you have tried before. The taste is out of this world!</p>
                        <h5 className="hover-title">MOZZARELLA</h5>
                    </section>
                    <section id="hover-2" className="">
                        <p className="hover-text">Made with simple ingredients, every bite is the perfect mix of crispiness and fluff, and ooh so cheesy.​ So so cheesy!</p>
                        <h5 className="hover-title">CHEDDAR CHEESE</h5>
                    </section>
                    <section id="hover-3" className="">
                        <p className="hover-text">Perfect to share or keep to yourself, these naturally gluten-free snacks will steal your heart and make you do a happy dance. We hope you love them!</p>
                        <h5 className="hover-title">PEPPER JACK</h5>
                    </section>
                </section>
                <button className="carousel-control-prev" type="button" data-bs-target="#home-carousel" data-bs-slide="prev">
                    <img src={leftArrow} className="arrow arrow-right" aria-hidden="true" alt="Previous Arrow" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#home-carousel" data-bs-slide="next">
                    <img src={rightArrow} className="arrow arrow-left" aria-hidden="true" alt="Next Arrow" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <section className="d-flex">
                <Link className="shop-now mx-auto" to="/products">Shop Now</Link>
            </section>
            <section className="d-flex">
                <img src={shopNowShadow} className="shop-now-shadow mx-auto" alt="Shop Now Shadow" />
            </section>
        </section>
        <img src={background3} className="background-3" alt="background Hover" />
        <section className="home-background-2">
            <section className="d-flex mt-3 justify-content-around" id="icons-container">
                <section className="text-end">
                    <img src={simpleIngredients} className="icon-img" alt="Simple Ingredients" />
                    <p className="icon-text ms-auto">Simple Ingredients</p>
                </section>
                <section className="text-center mt-2">
                    <img src={vegetarianFriendly} className="icon-img" alt="Vegetarian Friendly" />
                    <p className="icon-text mx-auto">Vegetarian Friendly</p>
                </section>
                <img src={wisconsin} className="wisconsin-img" alt="Proudly Cheese Wisconsin" />
                <section className="text-center mt-1">
                    <img src={fifteenPieces} className="icon-img" alt="15 Pieces" />
                    <p className="icon-text mx-auto">Pieces</p>
                </section>
                <section className="text-start mt-1">
                    <img src={glutenFree} className="icon-img" alt="Gluten Free" />
                    <p className="icon-text me-auto">GF</p>
                </section>
            </section>
            <section className="" id="icons-container-2">
                <section className="mt-3 row" id="row-correction">
                    <section className="text-center col simple">
                        <img src={simpleIngredients} className="icon-img-2" alt="Simple Ingredients" />
                        <p className="icon-text-2 mx-auto">Simple Ingredients</p>
                    </section>
                    <section className="col">
                        <img src={wisconsin} className="wisconsin-img-2 d-flex mx-auto" alt="Proudly Cheese Wisconsin" />
                    </section>
                    <section className="text-center col vegetarian">
                        <img src={vegetarianFriendly} className="icon-img-2" alt="Vegetarian Friendly" />
                        <p className="icon-text-2 mx-auto">Vegetarian Friendly</p>
                    </section>
                </section>
                <section className="row" id="row-correction">
                    <section className="text-center col pieces">
                        <img src={fifteenPieces} className="icon-img-2" alt="15 Pieces" />
                        <p className="icon-text-2 mx-auto">Pieces</p>
                    </section>
                    <section className="text-center col gluten">
                        <img src={glutenFree} className="icon-img-2" alt="Gluten Free" />
                        <p className="icon-text-2 mx-auto">GF</p>
                    </section>
                </section>
            </section>
            <Flickity className={'carousel flickity-container'} options={{
                    accessibility: false,
                    initialIndex: 0,
                    autoPlay: 5000,
                    groupCells: '80%',
                    pageDots: false,
                    prevNextButtons: false,
                    wrapAround: 'fill'
                }
            }>
                <img src={breadSandwich} className="flickity-img" alt="Bread as a Sandwich" />
                <img src={breadChocolate} className="flickity-img" alt="Bread with Chocolate" />
                <img src={breadCoffee} className="flickity-img" alt="Bread with Coffee" />
                <img src={breadPizza} className="flickity-img" alt="Bread Pizza" />
                <img src={breadPlate} className="flickity-img" alt="Bread on a Plate" />
                <img src={breadFruits} className="flickity-img" alt="Bread with Fruits" />
            </Flickity>
            <section className="row carousel-text" id="row-correction">
                <p className="col-1 text-4"></p>
                <p className="col text-1">Bittes with your favorite meal? Yes, please!</p>
                <p className="col text-2">Sweet home vibes? Pair Your Bittes</p>
                <p className="col text-3">Bittes for great times, enjoy!</p>
                <p className="col-1 text-4"></p>
            </section>
        </section>
        <img src={homeEnd} className="home-end" alt="Home Background" />
    </>
}

export default Home
