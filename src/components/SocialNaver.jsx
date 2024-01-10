import naver_logo from "../assets/images/naver_logo.png";

const SocialNaver = () => {
  const clientId = "IfzEwWXTArwqWeFjiNwb";
  //클라이언트 ID
  const stateString = "w4Lj7FkaZH";

  const reUrl = "http://localhost:3000/auth"; //리디렉션 URI
  // oauth 요청 URL
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${reUrl}&state=${stateString}`;
  const handleLogin = () => {
    window.location.href = naverUrl;
  };
  return (
    <>
      {/* <button onClick={handleLogin}>네이버 로그인</button>; */}
      <img src={naver_logo} alt="네이버로그인" onClick={handleLogin} />
    </>
  );
};
export default SocialNaver;
