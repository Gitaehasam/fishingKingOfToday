import React, { useState, useEffect } from "react";
import axios from "axios";
import SeaFish from "./SeaFish.json";
import { Link } from "react-router-dom";
import "../../assets/styles/fishbook/fishBookList.scss";

function FishBookList() {
  return (
    <ul className="fish-list">
      {SeaFish.fishbook.map((fish) => (
        <Link to={`/fishbook/${fish.id}`} key={fish.id}>
          <li className="fish-item">
            <div>{fish.name}</div>
            <div>{fish.endangeredSpecies}</div>
            <div>{fish.minimumSize}</div>
            <div>{fish.tabooStartAt}</div>
            <div>{fish.tabooEndAt}</div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default FishBookList;
