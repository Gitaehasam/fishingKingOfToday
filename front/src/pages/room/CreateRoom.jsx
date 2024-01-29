import React, {Component, useEffect, useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import back from "../../assets/images/backSymbol.svg"

function CreateRoom () {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState('')

  return (
    <> 
      <div>
        <div className="roomList-header" onClick={() => navigate("/roomList")}>
          <img src={back} alt="" />
          <span> 라이브</span>
        </div>
      </div>
    </>
  )
}

export default CreateRoom