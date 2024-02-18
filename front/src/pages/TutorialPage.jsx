import React, { useEffect, useRef, useState } from "react";
import baiting from "../assets/images/tutorial/baiting.webp";
import fishing_casting from "../assets/images/tutorial/fishing_casting.webp";
import fishing_tools from "../assets/images/tutorial/fishing_tools.webp";
import good_day from "../assets/images/tutorial/good_day.webp";
import ipzil from "../assets/images/tutorial/ipzil.webp";
import needle_floor from "../assets/images/tutorial/needle_floor.webp";
import remove_needle from "../assets/images/tutorial/remove_needle.webp";
import tying_reel from "../assets/images/tutorial/tying_reel.webp";
import "@assets/styles/tutorial/TutorialPage.scss";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const TutorialPage = () => {
  const itemsRef = useRef([]);
  const cursorsRef = useRef([]);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [yourCarouselItems, setYourCarouselItems] = useState([
    {
      title: "낚시 가기 좋은 날",
      num: 1,
      imageSrc: good_day,
    },
    {
      title: "준비물",
      num: 2,
      imageSrc: fishing_tools,
    },
    {
      title: "원투 낚시",
      num: 3,
      imageSrc: fishing_casting,
    },
    {
      title: "낚싯대 세팅",
      num: 4,
      imageSrc: tying_reel,
    },
    {
      title: "미끼 끼우기",
      num: 5,
      imageSrc: baiting,
    },
    {
      title: "낚시 캐스팅 & 입질",
      num: 6,
      imageSrc: ipzil,
    },
  ]);

  const speedWheel = 0.02;
  const speedDrag = -0.1;

  useEffect(() => {
    const items = itemsRef.current;
    const cursors = cursorsRef.current;

    const displayItems = (item, index, active) => {
      const zIndex = getZindex([...items], active)[index];
      item.style.setProperty("--zIndex", zIndex);
      item.style.setProperty("--active", (index - active) / items.length);
    };

    const animate = () => {
      const newProgress = Math.max(0, Math.min(progress, 100));
      const newActive = Math.floor((newProgress / 100) * (items.length - 1));

      setActive(newActive);

      items.forEach((item, index) => displayItems(item, index, newActive));
    };

    animate();

    const handleWheel = (e) => {
      const wheelProgress = e.deltaY * speedWheel;
      setProgress((prevProgress) => prevProgress + wheelProgress);
      animate();
    };

    const handleMouseMove = (e) => {
      if (e.type === "mousemove") {
        cursors.forEach((cursor) => {
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
      }

      if (!isDown) return;

      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const mouseProgress = (x - startX) * speedDrag;

      setProgress((prevProgress) => prevProgress + mouseProgress);
      setStartX(x);
      animate();
    };

    const handleMouseDown = (e) => {
      setIsDown(true);
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      setStartX(x);
    };

    const handleMouseUp = () => {
      setIsDown(false);
    };

    document.addEventListener("mousewheel", handleWheel);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousewheel", handleWheel);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [progress, isDown, startX]);

  const getZindex = (array, index) =>
    array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );

  return (
    <>
      <Header centerText={"튜토리얼"} prevPath={"/"} />
      <div className="carousel-body"></div>
      <div className="carousel">
        {yourCarouselItems.map((item, index) => (
          <div
            ref={(el) => (itemsRef.current[index] = el)}
            key={index}
            className="carousel-item"
          >
            <div
              className="carousel-box"
              onClick={() =>
                navigate(`/tutorial/${item.num}`, {
                  state: { title: item.title },
                })
              }
            >
              <div className="title">{item.title}</div>
              <div className="num">{item.num}</div>
              <img src={item.imageSrc} alt={item.title} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TutorialPage;
