import "./App.css";
import Login from "./pages/Login";
import MusicTimer from "./pages/MusicTimer";
import Player from "./components/Player";
import { useEffect, useState } from "react";
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const clientId = import.meta.env.VITE_CLIENT_ID;

function App() {
  const [token, setToken] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    async function getToken(code) {
      if (code && token === null) {
        let codeVerifier = localStorage.getItem("code_verifier");

        const payload = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          }),
        };

        const body = await fetch(
          "https://accounts.spotify.com/api/token",
          payload
        );
        const response = await body.json();
        localStorage.setItem("access_token", response.access_token);
        if (response) {
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          const updatedUrl = url.search ? url.href : url.href.replace("?", "");
          window.history.replaceState({}, document.title, updatedUrl);
        }
      }
      const newToken = localStorage.getItem("access_token");
      setToken(newToken);
    }
    getToken(code);
  }, []);
  console.log(token);
  return (
    <section>
      {token === null ? (
        <Login />
      ) : (
        <MusicTimer token={token} /> && <Player token={token} />
      )}
    </section>
  );
}

export default App;
