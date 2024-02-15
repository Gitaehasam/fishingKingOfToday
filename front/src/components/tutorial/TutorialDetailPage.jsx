import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import getTutorialInfo from '../../api/tutorial';
import Header from "@/components/Header";

import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, EffectCards, EffectCoverflow} from "swiper/modules";
import "swiper/swiper-bundle.css";
import "@/assets/styles/tutorial/TutorialDetailPage.scss"

function TutorialDetailPage(props) {
  const location = useLocation()
  const title = location.state.title
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tutorialInfo, setTutorialInfo] = useState([])
  const idx = useParams()

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex)
  }
  
  useEffect(() => {
    getTutorialInfo(idx.id).then((res) => {
      setTutorialInfo(res.tutorialInfo)
    })
  }, [])

  useEffect(() => {
    tutorialInfo.forEach(info => {
      const img = new Image();
      img.src = info.imageUrl;
    });
  }, [tutorialInfo]);
  

  return (
    <>
      <Header centerText={title} prevPath={"/tutorial"}/>
  
      <div className="tutorial-slider">
        <Swiper
          pagination={{
            type: 'progressbar',
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
                <img src={info.imageUrl}/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='tutorial-description'>
          <h2 className='tutorial-fishking-answer'>
            {tutorialInfo.length > 0 && <div>{tutorialInfo[currentIndex].description}</div>}
          </h2>
        </div>
      </div>
    </>
  );
}

export default TutorialDetailPage;