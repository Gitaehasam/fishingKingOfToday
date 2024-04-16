import React, { useEffect, Suspense, useState } from "react";
import "../assets/styles/aquarium/Aquarium.scss";
import Controls from "../components/aquarium/Controls";
import { FishTankScene } from "../components/aquarium/FishTankScene";
import back from "@assets/images/backSymbol.svg";
import axios from "axios";
import Loading from "../components/Loading";

const Aquarium = () => {
  const [CatchingInfo, setCatchingInfo] = useState({});

  const getCatchList = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/aquarium`,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );

      setCatchingInfo(res);
      console.log(CatchingInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCatchList();
  }, []);

  if (!CatchingInfo) {
    return <Loading />;
  }

  const [hasPostProcessing, setHasPostProcessing] = useState(true);

  // 물고기여부
  const [clownExist, setClownExist] = useState(true);
  const [clownCatch, setClownCatch] = useState(true);
  const [stoneExist, setStoneExist] = useState(true);
  const [stoneCatch, setStoneCatch] = useState(true);
  const [breamExist, setBreamExist] = useState(true);
  const [breamCatch, setBreamCatch] = useState(true);
  const [blackExist, setBlackExist] = useState(true);
  const [blackCatch, setBlackCatch] = useState(true);
  const [tileExist, setTileExist] = useState(true);
  const [tileCatch, setTileCatch] = useState(true);
  const [megiExist, setMegiExist] = useState(true);
  const [megiCatch, setMegiCatch] = useState(true);
  const [ingExist, setIngExist] = useState(true);
  const [ingCatch, setIngCatch] = useState(true);

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
