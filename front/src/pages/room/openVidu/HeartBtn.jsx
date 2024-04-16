import React, { useEffect } from 'react';
import "../../../assets/styles/room/heartBtn.scss"
import { LuFish } from "react-icons/lu";

let idCounter = 0;

const HeartButton = ({ session, myUserName, myUserImg, favIcons, setFavIcons }) => {
  const fishIcons = ['🦈','🐬','🐳','🐋','🐟','🐠','🐡','🦐','🦑','🐙','🦀','🦞','🐚','🎣','💖']

  const handleClick = () => {
    const randomIcon = fishIcons[Math.floor(Math.random() * fishIcons.length)];
    setFavIcons((prev) => [...prev, { id: idCounter++, y: 100, icon: randomIcon }]);
    session.signal({
      data: `${myUserName}|${myUserImg}|${randomIcon}`,
      type: 'heart',
    })
    .catch(error => console.error('Error sending heart signal:', error));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFavIcons((prev) =>
        prev.filter((icon) => icon.y > 50)
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);
 
  return (
    <div>
      <LuFish onClick={handleClick}/>
      <div>
        {favIcons.map((icon) => (
          <div
            key={icon.id}
            className="heart-icon"
          >
            {icon.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeartButton;
