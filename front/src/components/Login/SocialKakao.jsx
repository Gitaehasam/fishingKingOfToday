import kakao_logo from "../../assets/images/kakao_logo.png";

const SocialKakao = () => {
  const Rest_api_key = "db5b74e6c640443403b9705680d9dbac"; //REST API KEY
  const redirect_uri = "http://localhost:3000/login/kakao"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <img src={kakao_logo} alt="카카오로그인" onClick={handleLogin} />
    </>
  );
};
export default SocialKakao;
