import React, { useState } from "react";
import "../../assets/styles/fishbook/FishBookDetail.scss";

const FishBookDetail = ({ fish }) => {
  const [turn, setTurn] = useState(false);
  const [interview, setInterView] = useState([]);

  // const inter = JSON.parse(fish.interview);
  // console.log(JSON.parse(fish.interview));

  const choose = () => {
    setTurn(!turn);
    const inter = JSON.parse(fish.interview);
    setInterView(inter);
    console.log(interview);
    console.log(fish.interview);
    console.log(typeof fish.interview);
    console.log(inter);
    console.log(typeof inter);
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
          <div className="science-name">
            학명
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
          <div className="habitat" style={{ whiteSpace: "pre-line" }}>
            {fish.habitat}
          </div>
        </div>
        <div className="back">
          <div className="question">
            Q. {interview.first_question}
            <div style={{ whiteSpace: "pre-line" }}>
              {interview.first_answer}
            </div>
          </div>
          <div className="question">
            Q. {interview.second_question}
            <div style={{ whiteSpace: "pre-line" }}>
              {interview.second_answer}
            </div>
          </div>
          {interview.third_question && (
            <div className="question">
              Q. {interview.third_question}
              <div style={{ whiteSpace: "pre-line" }}>
                {interview.third_answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FishBookDetail;
