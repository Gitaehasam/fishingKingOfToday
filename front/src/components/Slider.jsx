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
import { useNavigate } from "react-router-dom";

// import "swiper/css";
import "swiper/swiper-bundle.css";
import "@assets/styles/Slider.scss";

const SHOWS = [
  { page: 0, title: "Tutorial", url: "/tutorial" },
  { page: 1, title: "너의이름은", url: "/fishbook" },
  { page: 2, title: "수족관", url: "/chatbot" },
];

const Slider = ({ setBack }) => {
  const navigate = useNavigate();

  const move = (url) => {
    navigate(url);
  };

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
        onSlideChange={(e) => {
          setBack(e.activeIndex);
        }}
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
          return (
            <SwiperSlide
              key={idx}
              className={`slider${show.page}`}
              onClick={() => move(show.url)}
            >
              {show.title}
            </SwiperSlide>
          );
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
