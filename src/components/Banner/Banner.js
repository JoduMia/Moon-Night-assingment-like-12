import React from 'react'
import HeroSlider, { Slide } from "hero-slider";

import img1 from '../../assets/images/bus.jpg'
import img2 from '../../assets/images/car.jpg'
import img3 from '../../assets/images/truck.jpg'


const Banner = () => {
    return (
        <div className='h-[600px] relative'>

            {/* <HeroSlider
                slidingAnimation="fade"
                orientation="fade"
                initialSlide={1}
                onBeforeChange={(previousSlide, nextSlide) =>
                    console.log("onBeforeChange", previousSlide, nextSlide)
                }
                onChange={(nextSlide) => console.log("onChange", nextSlide)}
                onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0)"
                }}
                settings={{
                    slidingDuration: 1500,
                    slidingDelay: 1000,
                    shouldAutoplay: true,
                    shouldDisplayButtons: false,
                    autoplayDuration: 100,
                    height: "30vh"
                }}
            >

                <Slide
                    background={{
                        backgroundImage: img1,
                        backgroundAttachment: "fixed",
                        backgroundSize: "contain ",
                        backgroundRepeat: "no-repeat",
                        backfaceVisibility: "hidden"
                    }}
                />

                <Slide
                    background={{
                        backgroundImage: img2,
                        backgroundAttachment: "fixed",
                        backgroundSize: "contain ",
                        backgroundRepeat: "no-repeat",
                        backfaceVisibility: "hidden"
                    }}
                />

                <Slide
                    background={{
                        backgroundImage: img3,
                        backgroundAttachment: "fixed",
                        backgroundSize: "contain ",
                        backgroundRepeat: "no-repeat",
                        backfaceVisibility: "hidden"
                    }}
                />

            </HeroSlider> */}
            <HeroSlider
            slidingAnimation='left_to_right'
            orientation='horizontal'
            initialSlide={1}
            onBeforeChange={(previousSlide, nextSlide) =>
                console.log("onBeforeChange", previousSlide, nextSlide)
            }
            onChange={(nextSlide) => console.log("onChange", nextSlide)}
            onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
            style={{
                backgroundColor: 'rgba(0,0,0,0.33)',
            }}
            settings={{
                slidingDuration: 250,
                slidingDelay: 1000,
                shouldAutoplay: true,
                shouldDisplayButtons: true,
                autoplayDuration: 1000,
                maxHeight: "30vh"
            }}
        >
            <Slide
                background={{
                    backgroundImageSrc: img2,
                    backgroundAttachment: 'fixed'
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: img3,
                    backgroundAttachment: 'fixed'
                }}
            />

            <Slide
                background={{
                    backgroundImageSrc: img1,
                    backgroundAttachment: 'fixed'
                }}
            />
        </HeroSlider>

            <div className='absolute top-1/3 left-1/3 md:text-4xl text-2xl lg:text-7xl  font-bold text-white z-50 -translate-x-1/2 uppercase bg-[#0e0eaec7] p-3 rounded'>
                <h1>Buy Your Dream</h1>
                <h1>FLat at low cost</h1>
            </div>
        </div>
    )
}

export default Banner