import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import getTutorialInfo from "../../api/tutorial";
import Header from "@/components/Header";

import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCards, EffectCoverflow } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "@/assets/styles/tutorial/TutorialDetailPage.scss";

function TutorialDetailPage(props) {
  const location = useLocation();
  const title = location.state.title;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tutorialInfo, setTutorialInfo] = useState([]);
  const idx = useParams();

  const goodday = [
    {
      option: "최대 풍속 6 권장",
    },
    {
      option: "1 ~ 2m",
    },
    {
      option: "15cº 이상",
    },
    {
      option: "물살이 잔잔한 곳",
    },
    {
      option: "일출과 일몰",
    },
    {
      option: "만조",
    },
    {
      option: "3 ~ 5물",
    },
  ];

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  useEffect(() => {
    getTutorialInfo(idx.id).then((res) => {
      setTutorialInfo(res.tutorialInfo);
    });
  }, []);

  useEffect(() => {
    tutorialInfo.forEach((info) => {
      const img = new Image();
      img.src = info.imageUrl;
    });
  }, [tutorialInfo]);

  return (
    <>
      <Header centerText={title} prevPath={"/tutorial"} />

      <div className="tutorial-slider">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          modules={[EffectCoverflow, Pagination, EffectCards]}
          effect="coverflow"
          onSlideChange={handleSlideChange}
          centeredSlides={true}
          mousewheel={{ invert: false }}
          spaceBetween={-100}
          slideToClickedSlide={true}
        >
          {tutorialInfo.map((info, idx) => (
            <SwiperSlide key={idx}>
              <div className="slide-content">
                <img src={info.imageUrl} />
              </div>
            </SwiperSlide>
          ))}
          {idx.id == 1 && (
            <div className="goodday">{goodday[currentIndex].option}</div>
          )}
        </Swiper>

        <div className="tutorial-description">
          <div className="tutorial-fishking-answer">
            {tutorialInfo.length > 0 && (
              <p>{tutorialInfo[currentIndex].description}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorialDetailPage;
