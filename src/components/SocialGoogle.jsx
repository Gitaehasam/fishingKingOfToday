import google_logo from "../assets/images/google_logo.png";

const SocialGoogle = () => {
  const clientId =
    "68067767440-hri2501h11p1d08asfsfaf6t2705u9cr.apps.googleusercontent.com"; //클라이언트 ID
  const redirect_uri = "http://localhost:3000/login/google"; //리디렉션 URI
  // oauth 요청 URL
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${redirect_uri}&client_id=${clientId}`;
  const handleLogin = () => {
    window.location.href = googleURL;
    // window.open(googleURL, '_self', 'width=500px,height=600px,scrollbars=yes')
  };
  return (
    <>
      {/* <button onClick={handleLogin}>구글 로그인</button> */}
      <img src={google_logo} alt="구글로그인" onClick={handleLogin} />
    </>
  );
};
export default SocialGoogle;
