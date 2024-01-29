import "../../assets/styles/Login/Carousel.scss";
import login from "../../assets/images/login_img.png";
import { useState, useRef } from "react";

const Carousel = () => {
  const a = [login, login, login];
  const [currentIdx, setCurrentIdx] = useState(0);
  const sliderRef = useRef();

  const checkCurrentIndex = () => {
    const node = sliderRef.current;
    const currentIndex = Math.round(node.scrollLeft / node.offsetWidth);
    setCurrentIdx(currentIndex);
  };

  return (
    <div className="Carousel">
      <div className="slides" ref={sliderRef} onScroll={checkCurrentIndex}>
        {a.map((item, index) => {
          // return (
          //   <div key={index} className={`slide-${index + 1}`}>
          //     <img src={item} alt="" />
          //   </div>
          // );
          return (
            <img
              src={item}
              alt=""
              key={index}
              className={`slide-${index + 1}`}
            />
          );
        })}
      </div>
      <div className="Carousel_idx">
        {currentIdx + 1} / <span>{a.length}</span>
      </div>
    </div>
  );
};

export default Carousel;
