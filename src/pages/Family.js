import { useEffect } from 'react'
import { useQuery, gql } from "@apollo/client"

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

import Flickity from 'react-flickity-component'


const GET_FAMILY = gql`
    query {
        getFamily {
            title
            description
        }
    }
`

const GET_INSTAGRAM_MEDIA = gql`
    query {
        getInstagramMedia(count: 5) {
            url
            image
        }
    }
`

const Family = () => {

    const { data } = useQuery(GET_FAMILY)
    const { data: media } = useQuery(GET_INSTAGRAM_MEDIA)

    useEffect(() => document.getElementById('our-family-video').play(), [])

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
                        <h5 className="col-9 family-title">{data && data.getFamily[0].title}</h5>
                        <img src={iconPerson} className="icon-person col-3 my-auto" alt="All about the family Icon" />
                    </section>
                    <p className="paragraph">{data && data.getFamily[0].description}</p>
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
                        <h5 className="col-8 family-title">{data && data.getFamily[1].title}</h5>
                        <img src={iconBread} className="icon-bread col-4 my-auto" alt="How we started Icon" />
                    </section>
                    <p className="paragraph">{data && data.getFamily[1].description}</p>
                </section>
            </section>
            <section className="row py-5" id="row-correction">
                <section className="col-lg-8 col-sm-12 col-12 family-group1">
                    <section className="row">
                        <h5 className="col-9 family-title pt-2">{data && data.getFamily[2].title}</h5>
                        <img src={iconHouse} className="icon-house col-3 my-auto" alt="Wisconsin proud Icon" />
                    </section>
                    <p className="paragraph">{data && data.getFamily[2].description}</p>
                </section>
                <section className="col-lg-4 col-sm-12 col-12 text-center">
                    <img src={wisconsin} className="proud mt-2" alt="All about the family" />
                </section>
            </section>
        </section>
        <video className="pt-5" id="our-family-video" autoPlay loop muted>
            <source src={video} type="video/mp4" />
        </video>
        <section className="row background3" id="row-correction">
            <img src={america} className="america col-lg-5 order-lg-1 col-sm-12 order-sm-2 order-2 mx-auto" alt="America" />
            <section className="col-lg-7 col-lg-2 col-sm-12 order-sm-1 order-1 my-auto giving-back">
                <h2>{data && data.getFamily[3].title}</h2>
                <p>{data && data.getFamily[3].description}</p>    
            </section>
        </section>
        <section className="background4">
            <Flickity className="carousel family-carousel" options={{
                    accessibility: false,
                    initialIndex: 2,
                    autoPlay: 7000,
                    groupCells: 1,
                    pageDots: false,
                    prevNextButtons: false,
                    wrapAround: 'fill'
                }
            }>
                {media?.getInstagramMedia.map((media, i) => {
                    return <a href={media.url} target="_blank" rel="noreferrer" key={i}>
                        <img src={`data:image/png;base64,${media.image}`} alt="Instagram Media" />
                    </a>
                })}
            </Flickity>
        </section>
        <img src={background3} className="background5" alt="Family Background" />
    </>
}

export default Family
