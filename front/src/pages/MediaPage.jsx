import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CameraIcon from "@mui/icons-material/Camera";
import "@assets/styles/board/Media.scss";

const MediaPage = () => {
  return (
    <>
      <Header />
      <div className="choose-list">
        <Link to={"/media/roomlist"}>
          <div className="choose-item choose-live">
            <div className="liveroom">
              <div className="category-live">Live</div>
              <div className="triangle-bd">
                <div className="triangle"></div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/media/board"}>
          <div className="choose-item choose-photo">
            <div className="photo">Photo</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MediaPage;
