import { useState, useEffect, useRef } from "react";
import {} from "tone";
import Delay from "./FX/Delay";
import Reverber from "./FX/Reverb";
import Choruser from "./FX/Chorus";
import PitchShifter from "./FX/PitchShift";
import Compress from "./FX/Compressor";
import Chebyshever from "./FX/Chebyshev";

function useSelectFx(busOneFxOneChoice, busOneFxTwoChoice, busOneChannel) {
  const choices = useRef([]);

  const [busOneFxOneControls, setBusOneFxOneControls] = useState(null);
  const [busOneFxTwoControls, setBusOneFxTwoControls] = useState(null);

  // when busOneFxOneChoice is selected it initiates new FX
  choices.current = [busOneFxOneChoice, busOneFxTwoChoice];
  useEffect(() => {
    choices.current.forEach((choice, index) => {
      const i = index + 1;
      switch (choice) {
        case "fx1":
        case "fx2":
          break;
        case "delay":
          i === 1 &&
            setBusOneFxOneControls(<Delay busOneChannel={busOneChannel} />);
          i === 2 &&
            setBusOneFxTwoControls(<Delay busOneChannel={busOneChannel} />);
          break;
        case "reverb":
          i === 1 &&
            setBusOneFxOneControls(<Reverber busOneChannel={busOneChannel} />);
          i === 2 &&
            setBusOneFxTwoControls(<Reverber busOneChannel={busOneChannel} />);
          break;
        case "chebyshev":
          i === 1 &&
            setBusOneFxOneControls(
              <Chebyshever busOneChannel={busOneChannel} />
            );
          i === 2 &&
            setBusOneFxTwoControls(
              <Chebyshever busOneChannel={busOneChannel} />
            );
          break;
        case "pitch-shift":
          i === 1 &&
            setBusOneFxOneControls(
              <PitchShifter busOneChannel={busOneChannel} />
            );
          i === 2 &&
            setBusOneFxTwoControls(
              <PitchShifter busOneChannel={busOneChannel} />
            );
          break;
        case "chorus":
          i === 1 &&
            setBusOneFxOneControls(<Choruser busOneChannel={busOneChannel} />);
          i === 2 &&
            setBusOneFxTwoControls(<Choruser busOneChannel={busOneChannel} />);
          break;
        case "compressor":
          i === 1 &&
            setBusOneFxOneControls(<Compress busOneChannel={busOneChannel} />);
          i === 2 &&
            setBusOneFxTwoControls(<Compress busOneChannel={busOneChannel} />);
          break;
        default:
          break;
      }
    });
  }, [busOneFxOneChoice, busOneFxTwoChoice, busOneChannel]);

  return [busOneFxOneControls, busOneFxTwoControls];
}

export default useSelectFx;
