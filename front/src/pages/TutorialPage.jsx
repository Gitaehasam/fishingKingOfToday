import React, { useEffect, useRef, useState } from "react";
import you from "../assets/images/공유.jpg";
import "./TutorialPage.scss";

const TutorialPage = () => {
  // Refs for DOM elements
  const itemsRef = useRef([]);
  const cursorsRef = useRef([]);

  // State for animation progress
  const [progress, setProgress] = useState(50);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [yourCarouselItems, setYourCarouselItems] = useState([
    {
      title: "제목",
      num: 1,
      imageSrc: you,
    },
    {
      title: "제목",
      num: 2,
      imageSrc: you,
    },
    {
      title: "제목",
      num: 3,
      imageSrc: you,
    },
    {
      title: "제목",
      num: 4,
      imageSrc: you,
    },
    {
      title: "제목",
      num: 5,
      imageSrc: you,
    },
  ]);

  // Constants
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // useEffect to setup listeners
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

  // Helper function for zIndex calculation
  const getZindex = (array, index) => array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));

  return (
    <>
      <div className="carousel-body"></div>
      <div className="carousel">
        {yourCarouselItems.map((item, index) => (
          <div ref={(el) => (itemsRef.current[index] = el)} key={index} className="carousel-item">
            <div className="carousel-box">
              <div className="title">{item.title}</div>
              <div className="num">{item.num}</div>
              <img src={item.imageSrc} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TutorialPage;
