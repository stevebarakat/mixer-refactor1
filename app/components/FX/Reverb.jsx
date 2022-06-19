import { useRef, useEffect } from "react";
import { Reverb } from "tone";

export default function Reverber({ busOneChannel }) {
  const controls = useRef();

  useEffect(() => {
    controls.current = new Reverb({
      wet: 1,
    }).toDestination();
  }, []);

  useEffect(() => {
    busOneChannel.connect(controls.current);
  }, [busOneChannel]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="pre-delay">Pre Delay:</label>
        <input
          type="range"
          name="pre-delay"
          min={0}
          max={1}
          step={0.0001}
          onChange={(e) => {
            controls.current.preDelay = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="decay">Decay:</label>
        <input
          type="range"
          name="decay"
          min={0.001}
          max={10}
          step={0.001}
          onChange={(e) => {
            controls.current.decay = parseFloat(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
