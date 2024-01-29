import React, { useState } from "react";
import "../../assets/styles/fishbook/fishBookDetail.scss";

const FishBookDetail = ({ fish }) => {
  const [turn, setTurn] = useState(false);

  const choose = () => {
    setTurn(!turn);
  };

  return (
    <>
      <div className={turn ? "card-rotate" : "back-rotate"} onClick={choose}>
        <div className="front">
          <div className="detail-title">Mulgogi</div>
          <div className="size">
            size
            <div>{fish.size}</div>
          </div>
          <img className="fish-img" src={fish.imageUrl}></img>
          <div className="sub-one">the fish</div>
          <div className="sub-two">we love</div>
          <div className="fish-name">{fish.name}</div>
          <div className="science-name">학명
          <div style={{ whiteSpace: "pre-line" }}>{fish.scientificName}</div>
          </div>
          <div className="food">
            Food
            <div style={{ whiteSpace: "pre-line" }}>{fish.bait}</div>
          </div>
          <div className="live">
            Where
            <br />
            you live
          </div>
            <div className="habitat" style={{ whiteSpace: "pre-line" }}>{fish.habitat}</div>
        </div>
        <div className="back">
          <div className="question">
            Q. {fish.interview.FirstQuestion}
            <div style={{ whiteSpace: "pre-line" }}>{fish.interview.FirstAnswer}</div>
          </div>
          <div className="question">
            Q. {fish.interview.SecondQuestion}
            <div style={{ whiteSpace: "pre-line" }}>{fish.interview.SecondAnswer}</div>
          </div>
          <div className="question">
            Q. {fish.interview.thirdQuestion}
            <div style={{ whiteSpace: "pre-line" }}>{fish.interview.thirdAnswer}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FishBookDetail;
