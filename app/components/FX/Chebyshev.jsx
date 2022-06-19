import { useRef, useEffect } from "react";
import { Chebyshev } from "tone";

export default function Chebyshever({ busOneChannel }) {
  const controls = useRef();

  useEffect(() => {
    controls.current = new Chebyshev({
      wet: 1,
    }).toDestination();
  }, []);

  useEffect(() => {
    busOneChannel.connect(controls.current);
  }, [busOneChannel]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="order">Order:</label>
        <input
          type="range"
          name="order"
          min={1}
          max={100}
          step={1}
          onChange={(e) => {
            controls.current.order = parseFloat(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
