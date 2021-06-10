import { Link } from 'react-router-dom'

import background1 from '../assets/img/products-background-1.png'
import background2 from '../assets/img/products-background-2.png'
import background3 from '../assets/img/products-background-3.png'
import header from '../assets/img/products-header.jpg'
import logo from '../assets/img/logo.png'

import mozzarella from '../assets/img/products-mozzarella.png'
import cheddar from '../assets/img/products-cheddar.png'
import pepperJack from '../assets/img/products-pepperjack.png'
import mix from '../assets/img/products-mix.png'
import bittesFruits from '../assets/img/product-bittes-fruits.png'

import oven from '../assets/img/oven.png'
import airFryer from '../assets/img/air-fryer.png'
import important from '../assets/img/important.png'


const Mozzarella = () => {
    return <>
        <img src={header} className="home-header" alt="Products Header" />
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <img src={background1} className="products-back1" alt="Products Background" />
        <section className="">
            <section className="row product-list" id="row-correction">
                <section className="col-lg-5 col-sm-5 col-5 text-end">
                    <img src={mozzarella} className="product-img" alt="Cheddar" />
                </section>
                <section className="col-lg-5 col-sm-7 col-7 product-text">
                    <Link to="/mozzarella" style={{ textDecoration: 'none' }}><h5>MOZZARELLA</h5></Link>
                    <p>Cheesy, crunchy, and fluffy! Our Cheesy Bittes are perfect for any time of the day. The delicate and fresh mozzarella flavor is melt-in-your-mouth delicious and wholly addictive. Pair them with smoothies, chocolate spread, or pasta. You will love them!</p>
                    <Link to="/mozzarella"><button>Get Some</button></Link>
                </section>
                <section className="col col-hidden"></section>
            </section>
            <section className="row product-list" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col-lg-5 col-sm-5 col-5 text-end">
                    <img src={cheddar} className="product-img" alt="Cheddar" />
                </section>
                <section className="col-lg-5 col-sm-7 col-7 product-text">
                    <Link to="/cheddar" style={{ textDecoration: 'none' }}><h5>CHEDDAR</h5></Link>
                    <p>Smooth, rich, and buttery! Our Cheesy Bittes are perfect to share with loved ones. The sharp cheddar flavor is delightful. Pair them with coffee, fruit, or nuts. You will be amazed!</p>
                    <Link to="/cheddar"><button>Get Some</button></Link>
                </section>
            </section>
            <section className="row product-list" id="row-correction">
                <section className="col-lg-5 col-sm-5 col-5 text-end">
                    <img src={pepperJack} className="product-img" alt="Cheddar" />
                </section>
                <section className="col-lg-5 col-sm-7 col-7 product-text">
                    <Link to="/pepper-jack" style={{ textDecoration: 'none' }}><h5>PEPPER JACK</h5></Link>
                    <p>Tasty, soft, and chewy! Our Cheesy Bittes are bundles of goodness. Packed with creamy notes and heat, pepper jack offers the ideal kick. Pair it with your favorite bowl of chili, a salad, or hot chocolate. Yum.</p>
                    <Link to="/pepper-jack"><button>Get Some</button></Link>
                </section>
                <section className="col col-hidden"></section>
            </section>
            <section className="row product-list pb-5" id="row-correction">
                <section className="col col-hidden"></section>
                <section className="col-lg-5 col-sm-5 col-5 text-end">
                    <img src={mix} className="product-img-2" alt="Cheddar" />
                </section>
                <section className="col-lg-5 col-sm-7 col-7 product-text">
                    <Link to="/mix" style={{ textDecoration: 'none' }}><h5>MIX THEM UP!</h5></Link>
                    <p>Why choose when you can enjoy them all! Give your taste buds a fascinating experience with a combination of mozzarella, cheddar, and pepper jack.</p>
                    <Link to="/mix"><button>Get Some</button></Link>
                </section>
            </section>
            <section className="row product-list" id="row-correction">
                <section className="col-lg-5 col-sm-5 col-5 text-end">
                    <img src={bittesFruits} className="product-img-2" alt="Cheddar" />
                </section>
                <section className="col-lg-5 col-sm-7 col-7 product-text">
                    <Link to="/fruit" style={{ textDecoration: 'none' }}><h5>BITTES & FRUIT</h5></Link>
                    <p>Let’s get the party started! Our Cheesy Bittes and natural fruit pulp are made for each other. Compliment your favorite snack with fresh juice, smoothies, cocktails, or desserts.</p>
                    <Link to="/fruit"><button>Get Some</button></Link>
                </section>
                <section className="col col-hidden"></section>
            </section>
        </section>
        <img src={background2} className="product-back" alt="Products Background" />
        <section className="green text-center">
            <h4>UNBOX, BAKE, ENJOY!</h4>
            <section className="row mt-5" id="row-correction">
                <section className="col-lg-4 px-4 instructions">
                    <img src={oven} className="oven" alt="Oven" />
                    <h5>Conventional Oven or Toaster Oven</h5>
                    <li className="bullet">Pre-heat oven to 400°F.</li>
                    <li className="bullet">Place frozen cheese bread balls onto parchment paper, about 1 inch apart.</li>
                    <li className="bullet">Bake for 20 - 25 minutes or until golden brown.</li>
                    Enjoy warm!
                </section>
                <section className="col-lg-4 px-4 instructions">
                    <img src={airFryer} className="air-fryer" alt="Air Fryer" />
                    <h5>Air Fryer</h5>
                    <li className="bullet green-padding">Place frozen cheese bread balls onto parchment paper, about 1 inch apart.</li>
                    <li className="bullet">Set to 375°F fro 12 - 15 minutes or until golden brown.</li>
                    Enjoy warm!
                </section>
                <section className="col-lg-4 px-4 instructions">
                    <img src={important} className="important" alt="Important" />
                    <h5>Important</h5>
                    <li className="bullet green-padding">Do not microwave</li>
                    <li className="bullet">Do not spray or grease</li>
                    <li className="bullet">Keep frozen until ready to bake</li>
                    Do not allow to thaw
                </section>
            </section>
        </section>
        <img src={background3} className="product-back-2" alt="Products Background" />
    </>
}

export default Mozzarella
