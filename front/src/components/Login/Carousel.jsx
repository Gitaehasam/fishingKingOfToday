import "../../assets/styles/login/Carousel.scss";
import login from "@assets/images/login_img.webp";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, EffectCreative } from "swiper/modules";
import "swiper/swiper-bundle.css";

const Carousel = () => {
  const a = [login, login, login];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  const SHOWS = [
    { rating: 8.5, title: "The Queen's Gambit" },
    { rating: 9.5, title: "Breaking Bad" },
    { rating: 8.1, title: "Wednesday" },
    { rating: 8.7, title: "Stranger Things" },
  ];

  return (
    <div className="Carousel">
      <Swiper
        modules={[EffectFade]}
        onSlideChange={handleSlideChange}
        effect="fade"
        centeredSlides={true}
        mousewheel={{ invert: false }}
        slideToClickedSlide={true}
      >
        {SHOWS.map((show, idx) => {
          return <SwiperSlide key={idx}></SwiperSlide>;
        })}
      </Swiper>
      <div className="Carousel_idx">
        {currentIndex + 1} / <span>{SHOWS.length}</span>
      </div>
    </div>
    // <div className="Carousel">
    //   <div className="slides" ref={sliderRef} onScroll={checkCurrentIndex}>
    //     {a.map((item, index) => {
    //       // return (
    //       //   <div key={index} className={`slide-${index + 1}`}>
    //       //     <img src={item} alt="" />
    //       //   </div>
    //       // );
    //       return (
    //         <img
    //           src={item}
    //           alt=""
    //           key={index}
    //           className={`slide-${index + 1}`}
    //         />
    //       );
    //     })}
    //   </div>
    //   <div className="Carousel_idx">
    //     {currentIdx + 1} / <span>{a.length}</span>
    //   </div>
    // </div>
  );
};

export default Carousel;
