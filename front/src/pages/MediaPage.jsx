import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/board/Media.scss";
import back from "../assets/images/backSymbol.svg";
import Header from "../components/Header";

const MediaPage = () => {
  return (
    <>
      <Header />
      {/* <img
        className="backfish"
        src={back}
        alt=""
        onClick={() => history.back()}
      /> */}
      <div className="choose-list">
        <Link to={"/media/roomlist"}>
          <div className="choose-item">
            <div className="bg-blue liveroom">Live</div>
          </div>
        </Link>
        <Link to={"/media/board"}>
          <div className="choose-item">
            <div className="bg-blue card photo">Photo</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MediaPage;
