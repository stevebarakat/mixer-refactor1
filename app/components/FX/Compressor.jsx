import { useRef, useEffect } from "react";
import { Compressor } from "tone";

export default function Compress({ busOneChannel }) {
  const controls = useRef();

  useEffect(() => {
    controls.current = new Compressor({
      wet: 1,
    }).toDestination();
  }, []);

  useEffect(() => {
    busOneChannel.connect(controls.current);
  }, [busOneChannel]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="threshold">Threshold:</label>
        <input
          type="range"
          name="threshold"
          min={-100}
          max={0}
          step={1}
          onChange={(e) => {
            controls.current.threshold.value = parseInt(e.target.value, 10);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="ratio">Ratio:</label>
        <input
          type="range"
          name="ratio"
          min={1}
          max={20}
          step={0.1}
          onChange={(e) => {
            controls.current.ratio.value = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="knee">Knee:</label>
        <input
          type="range"
          name="knee"
          min={0}
          max={40}
          step={0.1}
          onChange={(e) => {
            controls.current.knee.value = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="attack">Attack:</label>
        <input
          type="range"
          name="attack"
          min={0}
          max={1}
          step={0.00001}
          onChange={(e) => {
            controls.current.attack.value = parseFloat(e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="release">Release:</label>
        <input
          type="range"
          name="release"
          min={0}
          max={1}
          step={0.00001}
          onChange={(e) => {
            controls.current.release.value = parseFloat(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
