import SocialKakao from "../components/SocialKakao";
import SocialGoogle from "../components/SocialGoogle";
import SocialNaver from "../components/SocialNaver";
import Auth from "./Auth";

const Home = () => {
    return (
        <div>
            <div>메인페이지</div>
            <SocialKakao />
            <SocialGoogle />
            <SocialNaver />
        </div>
    );
};

export default Home;
