import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow,
  EffectCards,
  EffectCreative,
} from "swiper/modules";

// import "swiper/css";
import "swiper/swiper-bundle.css";
import "@assets/styles/Slider.scss";

const SHOWS = [
  { rating: 8.5, title: "The Queen's Gambit" },
  { rating: 9.5, title: "Breaking Bad" },
  { rating: 8.1, title: "Wednesday" },
  { rating: 8.7, title: "Stranger Things" },
];

const Slider = () => {
  return (
    // <div className="container">
    //   <Swiper
    //     modules={[Navigation, Pagination, Scrollbar, A11y]}
    //     spaceBetween={50}
    //     slidesPerView={3}
    //     navigation
    //     pagination={{ clickable: true }}
    //     scrollbar={{ draggable: true }}
    //     onSwiper={(swiper) => console.log(swiper)}
    //     onSlideChange={() => console.log("slide change")}
    //     // modules={[Navigation, Pagination]}
    //     // spaceBetween={50}
    //     // slidesPerView={3}
    //     // navigation
    //     // pagination={{ clickable: true }}
    //     // scrollbar={{ draggable: true }}
    //     effect="cards"
    //     // grabCursor={true}
    //     // centeredSlides={true}
    //     // initialSlide={2}
    //     // speed={500}
    //     // loop={true}
    //     // rotate={true}
    //     // mousewheel={{ invert: false }}
    //   >
    //     {/* <SwiperSlide>Slide 1</SwiperSlide>
    //     <SwiperSlide>Slide 2</SwiperSlide>
    //     <SwiperSlide>Slide 3</SwiperSlide>
    //     <SwiperSlide>Slide 4</SwiperSlide>
    //     <SwiperSlide>Slide 5</SwiperSlide> */}
    //     {shows.map((show, index) => (
    //       <SwiperSlide key={index}></SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>
    <div className="slider">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        slidesPerView={1.4}
        centeredSlides={true}
        mousewheel={{ invert: false }}
        onSlideChange={() => console.log("slide change")}
        spaceBetween={-100}
        slideToClickedSlide={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {SHOWS.map((show, idx) => {
          return <SwiperSlide key={idx}></SwiperSlide>;
        })}
      </Swiper>
    </div>
    // <Swiper
    //   modules={[EffectFade]}
    //   effect="fade"
    //   slidesPerView={1}
    //   centeredSlides={true}
    //   mousewheel={{ invert: false }}
    //   onSlideChange={() => console.log("slide change")}
    //   // spaceBetween={-100}
    //   slideToClickedSlide={true}
    //   coverflowEffect={{
    //     rotate: 50,
    //     stretch: 0,
    //     depth: 100,
    //     modifier: 1,
    //     slideShadows: true,
    //   }}
    // >
    //   {SHOWS.map((show, idx) => {
    //     return <SwiperSlide key={idx}></SwiperSlide>;
    //   })}
    // </Swiper>
  );
};

export default Slider;
