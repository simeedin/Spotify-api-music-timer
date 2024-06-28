import { useEffect, useState } from "react";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    async function getPlaylists() {
      const token = localStorage.getItem("access_token");
      if (token) {
        const result = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZF1F0sijgNaJdgit",
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
    };
    return trackObj;
  });

  console.log(tracks);

  let requestedDurationInMs = 960000;
  const allowedDiffInMs = 30000;
  // min: 885000 max: 915000
  let totalDurationInMs = 0;
  let timer = [];

  for (const track of tracks) {
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
  //   let duration = 210000;
  //   let trackNrs = [];

  //   for (let i = 0; i < 4; i++) {
  //     let randomNr = Math.floor(Math.random() * 99);
  //     trackNrs.push(randomNr);
  //   }

  //   console.log(trackNrs);

  //   const randomTracks = playlists;
  //   let wrapped = [];

  //   playlists.filter((playlist) => {
  //     const name = playlist.name;
  //     if (
  //       playlist.owner.display_name === "Spotify" &&
  //       name.includes("Your Top Songs")
  //     ) {
  //       wrapped.push(playlist);
  //     }
  //   });
  //   console.log(wrapped);
  return (
    <section>
      <h1>Playlists</h1>
    </section>
  );
}
export default Playlist;
