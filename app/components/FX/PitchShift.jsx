import { useRef, useEffect } from "react";
import { PitchShift } from "tone";

export default function PitchShifter({ busOneChannel }) {
  const controls = useRef();

  useEffect(() => {
    controls.current = new PitchShift({
      wet: 1,
    }).toDestination();
  }, []);

  useEffect(() => {
    busOneChannel.connect(controls.current);
  }, [busOneChannel]);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="pitch">Pitch:</label>
        <input
          type="range"
          name="pitch"
          min={-60}
          max={60}
          step={1}
          onChange={(e) => {
            controls.current.pitch = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="delay-time">Delay Time:</label>
        <input
          type="range"
          name="delay-time"
          min={0}
          max={1}
          step={0.00001}
          onChange={(e) => {
            controls.current.delayTime.value = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="size">Size:</label>
        <input
          type="range"
          name="size"
          min={0.03}
          max={0.1}
          step={0.00001}
          onChange={(e) => {
            controls.current.windowSize = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="feedback">Feedback:</label>
        <input
          type="range"
          name="feedback"
          min={0}
          max={1}
          step={0.00001}
          onChange={(e) => {
            controls.current.feedback.value = parseFloat(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
