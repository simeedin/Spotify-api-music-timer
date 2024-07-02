import { useEffect, useState } from "react";
import "./Player.css";
const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function Player(props) {
  const { token, trackUris, timer, generated } = props;
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (token) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Music Timer",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        setPlayer(player);

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          localStorage.setItem("device_id", device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          if (!state) {
            return;
          }
          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then((state) => {
            if (!state) {
              setActive(false);
            } else {
              setActive(true);
            }
          });
        });

        player.connect();
      };
    }
  }, []);

  const playTimer = async () => {
    const device = localStorage.getItem("device_id");
    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${device}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackUris }),
      }
    );
    setStarted(true);
  };

  const displayTracks = timer.map((track, i) => {
    let currentSong = "song";
    let currentArtist = "artist";
    if (track.name === current_track.name) {
      currentSong = "current-song";
      currentArtist = "current-artist";
    }
    return (
      <section className="track" key={i}>
        <p className={currentSong}>{track.name}</p>
        <p className={currentArtist}>{track.artists[0].name}</p>
      </section>
    );
  });

  return (
    <section className="player">
      {started ? (
        <section className="started">
          <button
            className="toggle"
            onClick={() => {
              player.togglePlay();
            }}
          >
            {is_paused ? "Play Timer" : "Pause Timer"}
          </button>
          <section>
            <p className="topic">Timer Playlist</p>
            <section className="playlist">{displayTracks}</section>
          </section>
        </section>
      ) : generated ? (
        <section>
          <button className="toggle" onClick={playTimer}>
            Start Timer
          </button>
          <section>
            <p className="topic">Timer Playlist</p>
            <section className="playlist">{displayTracks}</section>
          </section>
        </section>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Player;
