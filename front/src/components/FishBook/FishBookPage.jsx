import React, { useState, useEffect } from "react";
import FishBookList from "./FishBookList";
import Header from "../Header";
import { getFishList } from "../../api/fish";
import "@assets/styles/fishbook/FishBookPage.scss";

const FishBook = () => {
  const [fishdata, setFishData] = useState([]);
  const [datatype, setDataType] = useState(0);

  const getList = async () => {
    await getFishList().then((res) => setFishData(res));
    console.log("ddddddddddd");
    console.log(fishdata);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Header filter={"invert(1)"} headerColor={"inherit"} />
      <div className="fishbook-header bg-blue"></div>
      <div className="fishbook-title">FishUniverse</div>
      <div className="fishbook-category shadow">
        <div
          className={`fishbook-category-header ${
            datatype == 0 ? "blue-fc" : ""
          }`}
          onClick={() => setDataType(0)}
        >
          <div>전체</div>
          <div>46종</div>
        </div>
        <div
          className={`fishbook-category-header ${
            datatype == 2 ? "blue-fc" : ""
          }`}
          onClick={() => setDataType(2)}
        >
          <div>바다</div>
          <div>32종</div>
        </div>
        <div
          className={`fishbook-category-header ${
            datatype == 1 ? "blue-fc" : ""
          }`}
          onClick={() => setDataType(1)}
        >
          <div>민물</div>
          <div>14종</div>
        </div>
      </div>
      <div className="fishbook-list">
        {fishdata.fishBooks && (
          <FishBookList fishdata={fishdata.fishBooks} type={datatype} />
        )}
      </div>
    </>
  );
};

export default FishBook;
