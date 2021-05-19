import logo from '../assets/img/logo.png'
import mozzarella from '../assets/img/home-mozzarella.png'
import rightArrow from '../assets/img/arrow-right.png'
import leftArrow from '../assets/img/arrow-left.png'
import shopNowShadow from '../assets/img/shop-now-shadow.png'

const Home = () => {
    return <section className="home-background">
        <img src={logo} className="home-logo d-flex mx-auto" alt="Cheesy Bittes Logo" />
        <div id="carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner carousel-container">
                <div className="carousel-item active">
                    <img src={mozzarella} className="d-block carousel-img mx-auto d-flex" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={mozzarella} className="d-block carousel-img mx-auto d-flex" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={mozzarella} className="d-block carousel-img mx-auto d-flex" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <img src={leftArrow} className="arrow arrow-right" aria-hidden="true" alt="Previous Arrow" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <img src={rightArrow} className="arrow arrow-left" aria-hidden="true" alt="Next Arrow" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <section className="d-flex">
            <span className="shop-now mx-auto">Shop Now</span>
        </section>
        <section className="d-flex">
            <img src={shopNowShadow} className="shop-now-shadow mx-auto" alt="Shop Now Shadow" />
        </section>
    </section>
}

export default Home