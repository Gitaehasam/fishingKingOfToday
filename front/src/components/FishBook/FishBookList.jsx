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
    const year = string.substring(0, 4);
    if (year === "9999") return 0;
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
      <ul className="fish-list">
        <div className="fish-info-important">
          <div style={{ color: "red" }}>금어기</div>
          <div style={{ color: "#9bec9b" }}>금지체장</div>
        </div>
        {/* {fishdata.fishBooks} */}
        {filterdata && (
          <>
            {filterdata.map((fish, index) => (
              <Link to={`/fishbook/${fish.id}`} key={index}>
                <li className="fish-item view-two blue-bd shadow">
                  <div className={`fish-profile shadow ${fish.fishType}`}>
                    <img src={fish.imageUrl} alt="" />
                  </div>
                  <div className="fish-profile-type blue-fc">
                    {fish.fishType}
                  </div>
                  <div className="fish-profile-name">{fish.name}</div>
                  <div className="fish-profile-size">{fish.minimumSize}</div>
                  {cutDate(fish.tabooStartAt) != 0 && (
                    <div className="fish-date">
                      <div>
                        {cutDate(fish.tabooStartAt)}~{cutDate(fish.tabooEndAt)}
                      </div>
                    </div>
                  )}
                  {fish.mininumSize != 0 && (
                    <div className="bansize">{fish.mininumSize}</div>
                  )}
                  <div className="fish-detail-btn bg-blue">VIEW</div>
                </li>
              </Link>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default FishBookList;
