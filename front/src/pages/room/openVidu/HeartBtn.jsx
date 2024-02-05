import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../../../assets/styles/room/heartBtn.scss"

const HeartButton = () => {
  const [favIcons, setFavIcons] = useState([]);

  const handleClick = () => {
    setFavIcons((prev) => [...prev, { id: Date.now(), y: 100 }]);
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
      <button onClick={handleClick}>
        Heart
      </button>
      <div>
        {favIcons.map((icon) => (
          <div
            key={icon.id}
            className="heart-icon"
          >
            <FavoriteIcon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeartButton;
