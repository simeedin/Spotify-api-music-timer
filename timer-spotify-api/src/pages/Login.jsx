import { redirectToSpotifyAuth } from "../utils/auth";

function Login() {
  return (
    <section>
      <button onClick={redirectToSpotifyAuth}>Login with spotify</button>
    </section>
  );
}

export default Login;
