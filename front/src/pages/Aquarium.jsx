import React, { Suspense, useState } from "react";
import "../assets/styles/aquarium/Aquarium.scss";
import Controls from "../components/aquarium/Controls";
import { FishTankScene } from "../components/aquarium/FishTankScene";
import back from "@assets/images/backSymbol.svg";

const Aquarium = () => {
  const [separation, setSeparation] = useState(100);
  // 응집력
  const [cohesion, setCohesion] = useState(50);
  // 조정
  const [alignment, setAlignment] = useState(70);

  const [maxDistance, setMaxDistance] = useState(50);

  const [amountOfFish, setAmountOfFish] = useState(6);

  const [reset, setReset] = useState(false);
  const [hasPostProcessing, setHasPostProcessing] = useState(true);
  const [environment, setEnvironment] = useState("Sunset");

  // 물고기여부
  const [clownExist, setClownExist] = useState(false);
  const [clownCatch, setClownCatch] = useState(true);
  const [stoneExist, setStoneExist] = useState(false);
  const [stoneCatch, setStoneCatch] = useState(true);
  const [breamExist, setBreamExist] = useState(false);
  const [breamCatch, setBreamCatch] = useState(true);
  const [blackExist, setBlackExist] = useState(false);
  const [blackCatch, setBlackCatch] = useState(true);

  return (
    <div className="aquarium">
      <img
        src={back}
        alt=""
        className="back-fish-lish"
        onClick={() => history.back()}
      />
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
        ></Controls>
        <FishTankScene
          separation={separation}
          alignment={alignment}
          cohesion={cohesion}
          hasPostProcessing={hasPostProcessing}
          reset={reset}
          maxDistance={maxDistance}
          amountOfFish={amountOfFish}
          environment={environment}
          clownExist={clownExist}
          stoneExist={stoneExist}
          breamExist={breamExist}
          blackExist={blackExist}
        ></FishTankScene>
      </Suspense>
    </div>
  );
};

export default Aquarium;
