import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/board/Media.scss";
import back from "../assets/images/backSymbol.svg";
import Header from "../components/Header";

const MediaPage = () => {
  return (
    <>
      <Header />
      {/* <div className="choose-list">
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
      </div> */}
      <div className="splitview skewed">
        <div className="panel bottom">
          <div className="content">
            <div className="description">
              <h1>The original image.</h1>
              <p>This is how the image looks like before applying a duotone effect.</p>
            </div>

            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/original-image.jpg" alt="Original" />
          </div>
        </div>

        <div className="panel top">
          <div className="content">
            <div className="description">
              <h1>The duotone image.</h1>
              <p>This is how the image looks like after applying a duotone effect.</p>
            </div>

            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/duotone-image.jpg" alt="Duotone" />
          </div>
        </div>

        <div className="handle bg-blue"></div>
      </div>
    </>
  );
};

export default MediaPage;
