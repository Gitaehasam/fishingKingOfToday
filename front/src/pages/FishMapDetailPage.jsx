import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapDetailWeather from "../components/fishmap/MapDetailWeather";
import back from "../assets/images/backSymbol.svg";
import "../assets/styles/fishmap/FishMapDetailPage.scss";
import axios from "axios";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { useSetRecoilState } from "recoil";
import { prevPathAtom } from "../stores/FishingMapStore";

const FishMapDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content, position } = location.state.data;
  const { lat, lng } = location.state.data.position;
  const openWeatherApiKey = "87246d75e1ce26e1392a087b3d1d88c5";
  const setPrevPath = useSetRecoilState(prevPathAtom);

  console.log(content, position);

  const [reviewData, setReviewDate] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  const openWeather = async () => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${openWeatherApiKey}&units=metric&lang=kr`);
      setSunrise(new Date(res.data.city.sunrise * 1000));
      setSunset(new Date(res.data.city.sunset * 1000));
      setWeatherData(res.data.list);
    } catch (err) {
      console.log(err);
    } finally {
      setPrevPath(location.pathname);
    }
  };

  useEffect(() => {
    openWeather();
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
            <h2>{content.name}</h2>
            <div>{content.type}</div>
          </div>
          <div>{content.addr}</div>
        </div>
        <MapDetailWeather weatherData={weatherData} sunrise={sunrise} sunset={sunset} />
        <div className="fish-species">
          <h3 className="name">{content.name}의 주요어종</h3>
          <div className="wrapper">
            {content.fishes.map((fish) => {
              return (
                <div key={fish}>
                  <img key={fish} src="https://img.freepik.com/premium-photo/a-colorful-fish-with-a-white-and-blue-tail_899894-16102.jpg" />
                  <div>{fish}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="fishing-reviews">
          <h3 className="name">{content.name}의 리뷰</h3>
          <div className="wrapper">
            {reviewData.length ? (
              reviewData.map((review) => {
                return (
                  <div>
                    <img key={review} src="https://cdn.iconsumer.or.kr/news/photo/201806/7349_8772_1719.jpg" />
                    <div>{review}</div>
                  </div>
                );
              })
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
