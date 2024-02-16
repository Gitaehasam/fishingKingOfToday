import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import NoneLogin from "./login/NoneLogin";
import "../assets/styles/Navbar.scss";
import { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CameraIcon from "@mui/icons-material/Camera";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";

const Navbar = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [isOpen, setIsOpen] = useState(false);
  // const inputRef = useRef(null);

  const handleChangeFile = (e) => {
    const nextPreview = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(nextPreview);
    reader.onloadend = () => [navigate("/fish/image/edit", { state: { value: reader.result } })];
  };

  return (
    <>
      <div className="container">
        <div className="Navbar_body">
          <Outlet />
        </div>
        <nav className="nav">
          <NavLink to={"/"} className="nav-item">
            <HomeOutlinedIcon />
            <span>홈</span>
          </NavLink>
          <NavLink to={"/fish/map"} className="nav-item">
            <LocationOnOutlinedIcon />
            <span>피싱맵</span>
          </NavLink>
          <div className="nav-item hidden">
            <svg
              className="icon"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Home</span>
          </div>
          <div className="nav-item btn ">
            <div className="custum-file-upload bg-blue" onClick={() => setIsOpen(true)}>
              <CameraIcon />
            </div>
            {/* <label className="custum-file-upload bg-blue" htmlFor="file">
              <input
                type="file"
                id="file"
                accept="image/*"
                // capture="camera"
                capture="false"
                onChange={handleChangeFile}
              />
            </label> */}
          </div>
          <NavLink to={"/media"} className="nav-item ">
            <DashboardOutlinedIcon />
            <span>미디어</span>
          </NavLink>
          <NavLink to={"/user/mypage"} className="nav-item">
            <PersonOutlineOutlinedIcon />
            <span>마이</span>
          </NavLink>
          {/* {jwt ? (
            <NavLink to={"/user/mypage"} className="nav-item">
              <PersonOutlineOutlinedIcon />
              <span>마이</span>
            </NavLink>
          ) : (
            <div className="nav-item">
              <NoneLogin />
            </div>
          )} */}
        </nav>
        {isOpen && (
          <>
            <div className="choice" onClick={() => setIsOpen(false)}></div>
            <div className="camera-content">
              <label htmlFor="file1">
                <CameraAltOutlinedIcon />
                카메라로 촬영
                <input
                  // ref={inputRef}
                  type="file"
                  id="file1"
                  accept="image/*"
                  capture="camera"
                  onChange={handleChangeFile}
                />
              </label>
              <label htmlFor="file2">
                <PhotoLibraryOutlinedIcon />
                앨범에서 선택
                <input
                  // ref={inputRef}
                  type="file"
                  id="file2"
                  accept="image/*"
                  onChange={handleChangeFile}
                />
              </label>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
