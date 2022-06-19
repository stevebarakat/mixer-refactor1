import { useState, useEffect, useRef } from "react";
import {
  loaded,
  Player,
  EQ3,
  Channel,
  Transport as t,
  Destination,
  Volume,
} from "tone";
import Controls from "./Transport/Controls";

import MasterVol from "./Channels/MasterVol";
import Bus1 from "./Channels/Bus1";
import ChannelStrip from "./Channels/ChannelStrips";
import Loader from "./Loader";
import useMeter from "./useMeter";
import useSelectFx from "./useSelectFx";

function Mixer({ song, isLoaded, handleSetIsLoaded }) {
  const tracks = song.tracks;
  const channels = useRef([]);
  const players = useRef([]);
  const eqs = useRef([]);
  const busOneChannel = useRef(null);
  const [busOneFxOneChoice, setBusOneFxOneChoice] = useState(null);
  const handleSetBusOneFxOneChoice = (value) => setBusOneFxOneChoice(value);
  const [busOneFxTwoChoice, setBusOneFxTwoChoice] = useState(null);
  const handleSetBusOneFxTwoChoice = (value) => setBusOneFxTwoChoice(value);
  const [state, setState] = useState("stopped");
  const handleSetState = (value) => setState(value);
  let filledArray = Array.from({ length: tracks.length }, () => false);
  const [busOneActive, setBusOneActive] = useState(filledArray);

  // make sure song stops at end
  if (t.seconds > song.end) {
    t.seconds = song.end;
    t.stop();
    setState("stopped");
  }
  // make sure song doesn't rewind past start position
  if (t.seconds < 0) {
    t.seconds = song.start;
  }
  useEffect(() => {
    // create audio nodes

    busOneChannel.current = new Volume().toDestination();

    for (let i = 0; i < tracks.length; i++) {
      channels.current.push(
        new Channel(tracks[i].volume, tracks[i].pan).connect(Destination)
      );
      players.current.push(new Player(tracks[i].path));
      eqs.current.push(new EQ3());
      // meters.current.push(new Meter());
    }

    // connect everything
    players.current.forEach((player, i) =>
      player.chain(eqs.current[i], channels.current[i]).sync().start()
    );

    return () => {
      t.stop();
      t.seconds = 0;
      players.current.forEach((player, i) => {
        player.disconnect();
        eqs.current[i].disconnect();
        channels.current[i].disconnect();
      });
      players.current = [];
      eqs.current = [];
      channels.current = [];
    };
  }, [tracks]);

  const meterVals = useMeter(channels.current);

  const [busOneFxOneControls, busOneFxTwoControls] = useSelectFx(
    busOneFxOneChoice,
    busOneFxTwoChoice,
    busOneChannel.current
  );

  function toggleBusOne(e) {
    const id = parseInt(e.target.id[0], 10);
    channels.current.forEach((channel, i) => {
      if (id === i) {
        if (e.target.checked) {
          busOneActive[id] = true;
          setBusOneActive(busOneActive);
          channels.current[id].disconnect(Destination);
          channels.current[id].connect(busOneChannel.current);
        } else {
          busOneActive[id] = false;
          setBusOneActive(busOneActive);
          channels.current[id].disconnect(busOneChannel.current);
          channels.current[id].connect(Destination);
        }
      }
    });
  }

  useEffect(() => {
    loaded().then(() => handleSetIsLoaded(true));
  }, [handleSetIsLoaded, song]);

  // wait for the buffers to load
  return isLoaded === false ? (
    <div className="loader-wrap">
      <div className="logo-wrap">
        <img src="/remix.svg" alt="remix" width="500" />
      </div>
      <span>
        Loading: {song.artist} - {song.name}{" "}
      </span>
      <Loader />
    </div>
  ) : (
    <div className="console">
      <div className="header-wrap">
        <div className="logo-wrap">
          <img src="/remix.svg" alt="remix" width="600" />
          <p style={{ fontWeight: "bold" }}>version 0.0.0.0.1</p>
        </div>
        <div className="song-info">
          <p>Artist: {song.artist}</p>
          <p>Song:{song.name}</p>
          <p>Year:{song.year}</p>
          <p>Studio:{song.studio}</p>
          <p>Location:{song.location}</p>
        </div>
      </div>
      {busOneFxOneControls}
      {busOneFxTwoControls}
      <div className="mixer">
        {tracks.map((track, i) => {
          return (
            <ChannelStrip
              key={track.path}
              index={i}
              meterVal={meterVals[i]}
              channel={channels.current[i]}
              eq={eqs.current[i]}
              track={track}
              tracks={tracks}
              state={state}
              toggleBusOne={toggleBusOne}
            />
          );
        })}
        <Bus1
          state={state}
          busOneActive={busOneActive}
          busOneChannel={busOneChannel.current}
          handleSetBusOneFxOneChoice={handleSetBusOneFxOneChoice}
          handleSetBusOneFxTwoChoice={handleSetBusOneFxTwoChoice}
        />
        <MasterVol state={state} />
      </div>
      <div className="controls-wrap">
        <div className="controls-well">
          <Controls song={song} state={state} handleSetState={handleSetState} />
        </div>
      </div>
    </div>
  );
}

export default Mixer;
