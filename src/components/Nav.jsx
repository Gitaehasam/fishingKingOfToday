import { Link, NavLink, useNavigate } from "react-router-dom";
import "../assets/css/Nav.scss";
import Login from "./Login";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const closeCheck = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <nav>
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
        <label className="logo">
          <Link to={"/"}>Git에 하삼</Link>
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
          {isLogin ? (
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
                    localStorage.removeItem("user");
                    setIsLogin(false);
                    navigate("/");
                  }}
                >
                  Logout
                </div>
              </li>
            </>
          ) : (
            <li>
              <Login closeCheck={closeCheck} setIsLogin={setIsLogin} />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
