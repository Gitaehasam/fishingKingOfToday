import kakao_logo from "../assets/images/kakao_logo.png";

const SocialKakao = () => {
  const Rest_api_key = "6ffcec910d61c314586e30511b99083a"; //REST API KEY
  const redirect_uri = "http://localhost:3000/auth"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      {/* <button onClick={handleLogin}>카카오 로그인</button> */}
      <img src={kakao_logo} alt="카카오로그인" onClick={handleLogin} />
    </>
  );
};
export default SocialKakao;
