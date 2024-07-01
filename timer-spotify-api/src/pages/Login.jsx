import { redirectToSpotifyAuth } from "../utils/auth";
import TimePicker from "../components/TimePicker";
import "./Login.css";
function Login() {
  return (
    <section className="login">
      <TimePicker />
      <h1>Music Timer</h1>
      <button className="loginBtn" onClick={redirectToSpotifyAuth}>
        Login with spotify
      </button>
    </section>
  );
}

export default Login;
