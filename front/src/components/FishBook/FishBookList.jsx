import React, { useState, useEffect } from "react";
import axios from "axios";
import SeaFish from "./SeaFish.json";
import { Link } from "react-router-dom";
import "../../assets/styles/fishbook/FishBookList.scss";
import ban from "../../assets/images/ban.png";

const FishBookList = ({ fishdata, type }) => {
  console.log(fishdata);
  const [filterdata, setFilterData] = useState([type]);
  const [bandate, setBanDate] = useState(false);

  const cutDate = (date) => {
    const string = date + "";
    const month = string.substring(5, 7);
    const day = string.substring(8, 11);
    const result = month + "/" + day;

    return result;
  };

  useEffect(() => {
    if (type == 0) {
      setFilterData(fishdata);
    } else if (type == 1) {
      const updateArray = fishdata.filter(
        (item) => item.fishType === "FRESH_WATER"
      );
      setFilterData(updateArray);
    } else if (type == 2) {
      const updateArray = fishdata.filter((item) => item.fishType === "SEA");
      setFilterData(updateArray);
    }
  }, [type]);

  return (
    <>
      {/* <div>
      <div>금어기</div>
      <div>금지체장</div>
    </div> */}
      <ul className="fish-list">
        {/* {fishdata.fishBooks} */}
        {filterdata.map((fish) => (
          <Link to={`/fishbook/${fish.id}`} key={fish.id}>
            <li className="fish-item view-two blue-bd">
              <div className="fish-profile"></div>
              <div className="fish-profile-type blue-fc">{fish.fishType}</div>
              <div className="fish-profile-name">{fish.name}</div>
              <div className="fish-profile-size">{fish.minimumSize}</div>
              {fish.tabooStartAt && (
                <div className="fish-date">
                  <img
                    className={`${bandate ? "" : "bandate"}`}
                    src={ban}
                    alt=""
                    onClick={() => setBanDate(!bandate)}
                  />
                  <div>
                    {cutDate(fish.tabooStartAt)} ~ {cutDate(fish.tabooEndAt)}
                  </div>
                </div>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default FishBookList;
