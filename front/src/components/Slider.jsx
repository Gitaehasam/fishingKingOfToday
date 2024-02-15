import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { EffectCoverflow } from "swiper/modules";

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
              {/* <img className="slide-img" src={show.imgUrl} alt="" /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
