import { useEffect, useState } from "react";
import Player from "./Player";
import "./Playlist.css";
function Playlist(props) {
  const { ms, token, generated } = props;
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    async function getPlaylists() {
      if (token) {
        const result = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZF1E9UMvDGnXSlpL?si=2546656f4f534e8b",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const response = await result.json();
        setPlaylists(response.tracks.items);
        return response;
      }
    }
    getPlaylists();
  }, []);

  const tracks = playlists.map((track) => {
    const trackObj = {
      name: track.track.name,
      duration: track.track.duration_ms,
      uri: track.track.uri,
      artists: track.track.artists,
    };
    return trackObj;
  });

  console.log();

  const shuffle = (trackArr) => {
    return trackArr.sort(() => Math.random() - 0.5);
  };

  const shuffledPlaylist = shuffle(tracks);

  let requestedDurationInMs = ms;
  const allowedDiffInMs = 30000;
  let totalDurationInMs = 0;
  let timer = [];

  for (const track of shuffledPlaylist) {
    const duration = track.duration;
    if (
      totalDurationInMs + duration <
      requestedDurationInMs + allowedDiffInMs
    ) {
      totalDurationInMs += duration;
      timer.push(track);
    } else if (
      totalDurationInMs + duration >
      requestedDurationInMs + allowedDiffInMs
    ) {
      continue;
    } else if (
      totalDurationInMs >= requestedDurationInMs - allowedDiffInMs &&
      totalDurationInMs <= requestedDurationInMs + allowedDiffInMs
    ) {
      break;
    }
  }
  console.log(totalDurationInMs);
  console.log(timer);

  let trackUris = [];

  timer.map((item) => trackUris.push(item.uri));

  return (
    <section>
      <Player
        token={token}
        trackUris={trackUris}
        timer={timer}
        generated={generated}
      />
    </section>
  );
}
export default Playlist;
