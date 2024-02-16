import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { EffectCoverflow } from "swiper/modules";

// import "swiper/css";
import "swiper/swiper-bundle.css";
import "@assets/styles/Slider.scss";

const SHOWS = [
  { page: 0, sub: "낚시를 시작하는 초보낚시꾼을 위한", title: "가이드북", url: "/tutorial" },
  { page: 1, sub: "물고기, 널 알고싶어", title: "FishUniverse", url: "/fishbook" },
  { page: 2, sub: "내가 잡은 물고기로 만드는 ", title: "아쿠아리움", url: "/aquarium" },
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
            <SwiperSlide key={idx} className={`slider${show.page}`} onClick={() => move(show.url)}>
              <div className="slider-sub">{show.sub}</div>
              <div className="slider-title">{show.title}</div>

              {/* <img className="slide-img" src={show.imgUrl} alt="" /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
