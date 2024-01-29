import naver_logo from "../../assets/images/naver_logo.png";

const SocialNaver = () => {
  const clientId = "w88WA5fuXobhPaQEmw1p";
  //클라이언트 ID
  const stateString = "niwXgvCl5E";

  const reUrl = "http://localhost:3000/login/naver"; //리디렉션 URI
  // oauth 요청 URL
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${reUrl}&state=${stateString}`;
  const handleLogin = () => {
    window.location.href = naverUrl;
  };
  return (
    <>
      <img src={naver_logo} alt="네이버로그인" onClick={handleLogin} />
    </>
  );
};
export default SocialNaver;
