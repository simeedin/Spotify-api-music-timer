import { useEffect, useState } from "react";
import Playlist from "../components/Playlist";

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
        // console.log(response);
        setUserName(response.display_name);
        return response;
      }
    }
    getProfile();
  });

  return (
    <section>
      <h1>{`WELCOME ${userName}`}</h1>
    </section>
  );
}

export default MusicTimer;
