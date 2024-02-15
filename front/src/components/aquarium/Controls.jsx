import React, { useState } from "react";
import dol from "../../assets/images/aquarium/돌돔.webp";
import dongal from "../../assets/images/aquarium/흰동가리.webp";
import chamdom from "../../assets/images/aquarium/참돔.webp";
import gam from "../../assets/images/aquarium/감성돔.webp";

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
        </div>
      </div>
    </div>
  );
};

export default Controls;
