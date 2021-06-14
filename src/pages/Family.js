import { useEffect } from 'react'

import background2 from '../assets/img/family-background-2.png'
import background3 from '../assets/img/family-background-3.png'
import logo from '../assets/img/logo.png'
import america from '../assets/img/america.png'
import dot1 from '../assets/img/white-dot1.png'
import dot2 from '../assets/img/white-dot2.png'
import dot3 from '../assets/img/white-dot3.png'

import aboutFamily from '../assets/img/about-family.png'
import howStarted from '../assets/img/how-started.png'
import wisconsin from '../assets/img/wisconsin.png'

import iconPerson from '../assets/img/icon-person.png'
import iconBread from '../assets/img/icon-bread.png'
import iconHouse from '../assets/img/icon-house.png'

import video from '../assets/img/our-family-video.mp4'

import carousel1 from '../assets/img/family-carousel-1.png'
import carousel2 from '../assets/img/family-carousel-2.png'
import carousel3 from '../assets/img/family-carousel-3.png'
import carousel4 from '../assets/img/family-carousel-4.png'
import carousel5 from '../assets/img/family-carousel-5.png'

import Flickity from 'react-flickity-component'


const Family = () => {

    useEffect(() => {
        document.getElementById('our-family-video').play()
    })

    return <>
        <section className="background1">
            <img src={logo} className="family-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        </section>
        <img src={dot1} className="family-dot" id="family-dot-1" alt="Dot 1" />
        <img src={dot2} className="family-dot" id="family-dot-2" alt="Dot 2" />
        <img src={dot3} className="family-dot" id="family-dot-3" alt="Dot 3" />
        <img src={background2} className="background2" alt="Family Background" />
        <section className="family-2">
            <section className="row py-5" id="row-correction">
                <section className="col-lg-8 col-sm-12 col-12 family-group1">
                    <section className="row">
                        <h5 className="col-9 family-title">All about the family</h5>
                        <img src={iconPerson} className="icon-person col-3 my-auto" alt="All about the family Icon" />
                    </section>
                    <p className="paragraph">We are a small, family business that decided to pair the flavors of Ecuador and Wisconsin to share them with you! We are so thankful for this journey and hope you enjoy every cheesy bitte.</p>
                </section>
                <section className="col-lg-4 col-sm-12 col-12 text-center">
                    <img src={aboutFamily} className="about-family" alt="All about the family" />
                </section>
            </section>
            <section className="row my-4" id="row-correction">
                <section className="col-lg-4 col-sm-12 order-sm-2 col-12 order-2 order-lg-1 text-center">
                    <img src={howStarted} className="how-started" alt="How we started" />
                </section>
                <section className="col-lg-8 col-sm-12 order-sm-1 col-12 order-1 family-group1">
                    <section className="row">
                        <h5 className="col-8 family-title">How we started</h5>
                        <img src={iconBread} className="icon-bread col-4 my-auto" alt="How we started Icon" />
                    </section>
                    <p className="paragraph">After being diagnosed with celiac disease one of the only treats I could enjoy was pan de yuca.  When we moved to the United States, I was excited to find so many gluten-free options but missed the flavors of home that reminded me of family, friends, and time together. We decided to recreate our traditional pan de yuca recipe and pack it with exquisite Wisconsin cheese! The business was born in 2021 with our Cheesy Bittes.</p>
                </section>
            </section>
            <section className="row py-5" id="row-correction">
                <section className="col-lg-8 col-sm-12 col-12 family-group1">
                    <section className="row">
                        <h5 className="col-9 family-title pt-2">Wisconsin proud!</h5>
                        <img src={iconHouse} className="icon-house col-3 my-auto" alt="Wisconsin proud Icon" />
                    </section>
                    <p className="paragraph">The dreamy cheese we use in our recipes is made with milk from dedicated dairy farm families, so our products carry the Proudly Wisconsin Cheese badge. Farming is a labor of love, and we are all about loving our community.</p>
                </section>
                <section className="col-lg-4 col-sm-12 col-12 text-center">
                    <img src={wisconsin} className="proud mt-2" alt="All about the family" />
                </section>
            </section>
        </section>
        <video className="pt-5" id="our-family-video" autoplay loop muted>
            <source src={video} type="video/mp4" />
        </video>
        <section className="row background3" id="row-correction">
            <img src={america} className="america col-lg-5 order-lg-1 col-sm-12 order-sm-2 order-2 mx-auto" alt="America" />
            <section className="col-lg-7 col-lg-2 col-sm-12 order-sm-1 order-1 my-auto giving-back">
                <h2>Giving back</h2>
                <p>We donate a percentage of sales to scholarships for first-generation BIPOC students when you choose one of our products.  Join us in supporting their dreams while spreading some love.</p>    
            </section>
        </section>
        <section className="background4">
            <Flickity className={'carousel family-carousel'} options={{
                    accessibility: false,
                    initialIndex: 2,
                    autoPlay: 7000,
                    groupCells: 1,
                    pageDots: false,
                    prevNextButtons: false,
                    wrapAround: 'fill'
                }
            }>
                <img src={carousel1} className="" alt="Bread as a Sandwich" />
                <img src={carousel2} className="" alt="Bread with Chocolate" />
                <img src={carousel3} className="" alt="Bread with Coffee" />
                <img src={carousel4} className="" alt="Bread Pizza" />
                <img src={carousel5} className="" alt="Bread on a Plate" />
            </Flickity>
        </section>
        <img src={background3} className="background5" alt="Family Background" />
    </>
}

export default Family
