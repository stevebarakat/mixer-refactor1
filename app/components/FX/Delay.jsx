import { useRef, useEffect } from "react";
import { FeedbackDelay } from "tone";

function Delay({ busOneChannel }) {
  const controls = useRef();

  useEffect(() => {
    controls.current = new FeedbackDelay({
      wet: 1,
    }).toDestination();
  }, []);

  useEffect(() => {
    busOneChannel.connect(controls.current);
  }, [busOneChannel]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="delay-time">Delay Time:</label>
        <input
          type="range"
          name="delay-time"
          min={0}
          max={1}
          step={0.0001}
          onChange={(e) => {
            controls.current.delayTime.value = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="delay-feedback">Delay Feedback:</label>
        <input
          type="range"
          name="delay-feedback"
          min={0}
          max={1}
          step={0.0001}
          onChange={(e) => {
            controls.current.feedback.value = parseFloat(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default Delay;
