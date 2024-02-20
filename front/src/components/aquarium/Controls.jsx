import React, { useState } from "react";
import dol from "../../assets/images/aquarium/돌돔.webp";
import dongal from "../../assets/images/aquarium/흰동가리.webp";
import chamdom from "../../assets/images/aquarium/참돔.webp";
import gam from "../../assets/images/aquarium/감성돔.webp";
import tile from "../../assets/images/aquarium/옥돔.webp";
import megi from "../../assets/images/aquarium/메기.webp";
import bong from "../../assets/images/aquarium/붕어.webp";

const Controls = ({
  clownExist,
  setClownExist,
  clownCatch,
  stoneExist,
  setStoneExist,
  stoneCatch,
  breamExist,
  setBreamExist,
  breamCatch,
  blackExist,
  setBlackExist,
  blackCatch,
  tileExist,
  setTileExist,
  tileCatch,
  megiExist,
  setMegiExist,
  megiCatch,
  ingExist,
  setIngExist,
  ingCatch,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={`controls ${open ? "" : "closed"}`}>
        <button
          onClick={() => setOpen(!open)}
          className={"toggleButton"}
          type={"button"}
        ></button>
        <div className="fish-aqualist">
          <div
            className={`fish-aquaitem ${clownCatch ? "" : "disabled"} ${
              clownExist ? "checked" : ""
            }`}
          >
            <div className="fish-aquaprofile">
              <img src={dongal} alt="" />
              <div className="fish-aquaname">흰동가리</div>
            </div>
            <label>
              <input
                role="switch"
                type="checkbox"
                onClick={() => {
                  setClownExist((prev) => !prev);
                }}
              />
            </label>
          </div>
          <div
            className={`fish-aquaitem ${stoneCatch ? "" : "disabled"} ${
              stoneExist ? "checked" : ""
            }`}
          >
            <div className="fish-aquaprofile">
              <img src={dol} alt="" />
              <div className="fish-aquaname">돌돔</div>
            </div>
            <label>
              <input
                role="switch"
                type="checkbox"
                onClick={() => {
                  setStoneExist((prev) => !prev);
                }}
              />
            </label>
          </div>
          <div
            className={`fish-aquaitem ${breamCatch ? "" : "disabled"} ${
              breamExist ? "checked" : ""
            }`}
          >
            <div className="fish-aquaprofile">
              <img src={chamdom} alt="" />
              <div className="fish-aquaname">참돔</div>
            </div>
            <label>
              <input
                role="switch"
                type="checkbox"
                onClick={() => {
                  setBreamExist((prev) => !prev);
                }}
              />
            </label>
          </div>
          <div
            className={`fish-aquaitem ${blackCatch ? "" : "disabled"} ${
              blackExist ? "checked" : ""
            }`}
          >
            <div className="fish-aquaprofile">
              <img src={gam} alt="" />
              <div className="fish-aquaname">감성돔</div>
            </div>
            <label>
              <input
                role="switch"
                type="checkbox"
                onClick={() => {
                  setBlackExist((prev) => !prev);
                }}
              />
            </label>
          </div>
          <div
            className={`fish-aquaitem ${tileCatch ? "" : "disabled"} ${
              tileExist ? "checked" : ""
            }`}
          >
            <div className="fish-aquaprofile">
              <img src={tile} alt="" />
              <div className="fish-aquaname">옥돔</div>
            </div>
            <label>
              <input
                role="switch"
                type="checkbox"
                onClick={() => {
                  setTileExist((prev) => !prev);
                }}
              />
            </label>
          </div>
          <div
            className={`fish-aquaitem ${megiCatch ? "" : "disabled"} ${
              megiExist ? "checked" : ""
            }`}
          >
            <div className="fish-aquaprofile">
              <img src={megi} alt="" />
              <div className="fish-aquaname">메기</div>
            </div>
            <label>
              <input
                role="switch"
                type="checkbox"
                onClick={() => {
                  setMegiExist((prev) => !prev);
                }}
              />
            </label>
          </div>
          <div
            className={`fish-aquaitem ${ingCatch ? "" : "disabled"} ${
              ingExist ? "checked" : ""
            }`}
          >
            <div className="fish-aquaprofile">
              <img src={bong} alt="" />
              <div className="fish-aquaname">붕어</div>
            </div>
            <label>
              <input
                role="switch"
                type="checkbox"
                onClick={() => {
                  setIngExist((prev) => !prev);
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
