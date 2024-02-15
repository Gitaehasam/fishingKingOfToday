import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MapDetailWeather from "../components/fishmap/MapDetailWeather";
import axios from "axios";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { useSetRecoilState } from "recoil";
import { prevPathAtom } from "../stores/FishingMapStore";
import default_img from "@assets/images/default_profile.webp";
import "../assets/styles/fishmap/FishMapDetailPage.scss";

const OPEN_WEATHER_API_KEY = "87246d75e1ce26e1392a087b3d1d88c5";

const FishMapDetailPage = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [fishingInfo, setFishingInfo] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const setPrevPath = useSetRecoilState(prevPathAtom);

  const openWeather = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=kr`
      );

      console.log(res.data);
      setSunrise(new Date(res.data.city.sunrise * 1000));
      setSunset(new Date(res.data.city.sunset * 1000));
      setWeatherData(res.data.list);
    } catch (err) {
      console.log(err);
    } finally {
      setPrevPath(location.pathname);
    }
  };

  const getFishingInfo = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/spots/${params.idx}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      );
      console.log(res.data);

      setFishingInfo(res.data);

      await openWeather(res.data.latitude, res.data.longitude);
    } catch (error) {
      console.log(error);
    }
  };

  const getDate = (date) => {
    const now = new Date();
    const specificDate = new Date(date);

    const diffInHours = (specificDate - now) / (1000 * 60 * 60);

    const rtf = new Intl.RelativeTimeFormat("ko-KR");

    let relativeTime;

    if (Math.abs(diffInHours) < 24) {
      // 시간 단위로 변환
      relativeTime = rtf.format(Math.round(diffInHours), "hour");
    } else {
      // 일 단위로 변환
      relativeTime = rtf.format(Math.round(diffInHours / 24), "day");
    }

    return relativeTime;
  };

  useEffect(() => {
    getFishingInfo();
  }, []);

  // https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000

  if (!weatherData.length) {
    return <Loading />;
  }

  return (
    <div className="FishMapDetailPage">
      <Header prevPath={"/fish/map"} />
      <div className="body">
        <div className="fishing-info">
          <div className="fishing-name">
            <h2>{fishingInfo.name}</h2>
            <div>{fishingInfo.spotType}</div>
          </div>
          <div>{fishingInfo.streetAddress}</div>
        </div>
        <MapDetailWeather
          weatherData={weatherData}
          sunrise={sunrise}
          sunset={sunset}
        />
        <div className="fish-species">
          <h3 className="name">{fishingInfo.name}의 주요어종</h3>
          <div className="wrapper">
            {fishingInfo.fishes.length ? (
              fishingInfo.fishes.map((fish) => {
                return (
                  <div
                    key={fish.name}
                    onClick={() => navigate(`/fishbook/${fish.id}`)}
                  >
                    <img src={fish.imageUrl} className="blue-bd" />
                    <div>{fish.name}</div>
                  </div>
                );
              })
            ) : (
              <div className="none-data">정보를 준비 중입니다.</div>
            )}
          </div>
        </div>
        <div className="fishing-reviews">
          <h3 className="name">{fishingInfo.name}의 리뷰</h3>
          <div className="wrapper">
            {fishingInfo.boards.length ? (
              <>
                <div className="board">
                  {fishingInfo.boards.map((review) => {
                    return (
                      <div
                        key={review.boardId}
                        className="review"
                        onClick={() =>
                          navigate(`/media/board/${review.boardId}`)
                        }
                      >
                        <img
                          src={review.boardImageUrl}
                          className="review-img"
                        />
                        <div className="review-user">
                          <img
                            src={review.profileImageUrl || default_img}
                            alt=""
                          />
                          <div>{review.nickName}</div>
                        </div>
                        <div className="review-date">
                          {getDate(review.createdAt)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <div className="board-btn">
                  <button onClick={() => navigate("/media/board")}>
                    게시글 전체보기
                  </button>
                </div> */}
              </>
            ) : (
              <div className="none-data">정보를 준비 중입니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishMapDetailPage;
