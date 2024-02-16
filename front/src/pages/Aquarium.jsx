import React, { Suspense, useState } from "react";
import "../assets/styles/aquarium/Aquarium.scss";
import Controls from "../components/aquarium/Controls";
import { FishTankScene } from "../components/aquarium/FishTankScene";
import back from "@assets/images/backSymbol.svg";

const Aquarium = () => {
  const [hasPostProcessing, setHasPostProcessing] = useState(true);

  // 물고기여부
  const [clownExist, setClownExist] = useState(true);
  const [clownCatch, setClownCatch] = useState(true);
  const [stoneExist, setStoneExist] = useState(false);
  const [stoneCatch, setStoneCatch] = useState(true);
  const [breamExist, setBreamExist] = useState(false);
  const [breamCatch, setBreamCatch] = useState(true);
  const [blackExist, setBlackExist] = useState(false);
  const [blackCatch, setBlackCatch] = useState(true);
  const [tileExist, setTileExist] = useState(false);
  const [tileCatch, setTileCatch] = useState(true);
  const [megiExist, setMegiExist] = useState(false);
  const [megiCatch, setMegiCatch] = useState(false);
  const [ingExist, setIngExist] = useState(false);
  const [ingCatch, setIngCatch] = useState(true);

  return (
    <div className="aquarium">
      <img src={back} alt="" className="back-fish-lish" onClick={() => history.back()} />
      <Suspense
        fallback={
          <div>
            <div className={"spinner"}></div>
            <p>Loading...</p>
          </div>
        }
      >
        <Controls
          clownExist={clownExist}
          setClownExist={setClownExist}
          clownCatch={clownCatch}
          stoneExist={stoneExist}
          setStoneExist={setStoneExist}
          stoneCatch={stoneCatch}
          breamExist={breamExist}
          setBreamExist={setBreamExist}
          breamCatch={breamCatch}
          blackExist={blackExist}
          setBlackExist={setBlackExist}
          blackCatch={blackCatch}
          tileExist={tileExist}
          setTileExist={setTileExist}
          tileCatch={tileCatch}
          megiExist={megiExist}
          setMegiExist={setMegiExist}
          megiCatch={megiCatch}
          ingExist={ingExist}
          setIngExist={setIngExist}
          ingCatch={ingCatch}
        ></Controls>
        <FishTankScene
          hasPostProcessing={hasPostProcessing}
          clownExist={clownExist}
          stoneExist={stoneExist}
          breamExist={breamExist}
          blackExist={blackExist}
          tileExist={tileExist}
          megiExist={megiExist}
          ingExist={ingExist}
        ></FishTankScene>
      </Suspense>
    </div>
  );
};

export default Aquarium;
