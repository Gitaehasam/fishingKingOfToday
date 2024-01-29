import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import NoneLogin from "./Login/NoneLogin";
import "../assets/styles/Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const handleChangeFile = (e) => {
    const nextPreview = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(nextPreview);
    reader.onloadend = () => [
      navigate("/fish/image/edit", { state: { value: reader.result } }),
    ];
  };

  return (
    <>
      <div className="Navbar_body">
        <Outlet />
      </div>
      <nav className="nav">
        <NavLink to={"/"} className="nav-item">
          <GoHome />
          <span>홈</span>
        </NavLink>
        <NavLink to={"/fish/map"} className="nav-item">
          <FiMapPin />
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
        <div className="nav-item btn">
          <label className="custum-file-upload" htmlFor="file">
            <svg
              className="icon"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleChangeFile}
            />
          </label>
        </div>
        <div className="nav-item">
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
          <NavLink to={"/roomList"} className="nav-item">
            <span>RoomList</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <FaRegUser />
          <NoneLogin />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
