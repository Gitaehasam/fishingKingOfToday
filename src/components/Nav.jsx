import { Link, NavLink, useNavigate } from "react-router-dom";
import "../assets/css/Nav.scss";
import Login from "./Login";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../App";

const Nav = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const closeCheck = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(isLoggedIn);
  });

  return (
    <>
      <nav>
        <label className="logo">
          <Link to={"/"}>Git에 하삼</Link>
        </label>
        <input
          type="checkbox"
          id="check"
          checked={isOpen}
          onChange={() => setIsOpen((prev) => !prev)}
        />
        <label htmlFor="check" className="checkbtn">
          {/* <i>-----</i> */}
          {isOpen ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </label>
        <ul>
          <li>
            <NavLink to={"/about"} onClick={closeCheck}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to={"/services"} onClick={closeCheck}>
              Services
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to={"/my"} onClick={closeCheck}>
                  My
                </NavLink>
              </li>
              <li>
                <div
                  className="logout-btn"
                  onClick={() => {
                    closeCheck();
                    setIsLoggedIn(false);
                    sessionStorage.removeItem("jwt");
                    navigate("/");
                  }}
                >
                  Logout
                </div>
              </li>
            </>
          ) : (
            <li>
              <Login closeCheck={closeCheck} />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
