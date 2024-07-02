import { useEffect, useState } from "react";
import TimePicker from "../components/TimePicker";
import "./MusicTimer.css";
function MusicTimer(props) {
  const [userName, setUserName] = useState("");
  const { token } = props;

  useEffect(() => {
    async function getProfile() {
      if (token) {
        const result = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const response = await result.json();

        setUserName(response.display_name);
        return response;
      }
    }
    getProfile();
  });

  return (
    <section className="timer-page">
      <p className="user">{`Logged in as ${userName}`}</p>
      <TimePicker token={token} />
    </section>
  );
}

export default MusicTimer;
