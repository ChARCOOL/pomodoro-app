import React, { useState, useRef } from "react";

import "./App.css";

const padStart = (time) => time.toString().padStart(2, "0");

let counter = 0;
const App = () => {
  const [time, setTime] = useState(25 * 60);

  const interval = useRef();
  const startBtn = useRef();

  const clrIntvl = () => {
    clearInterval(interval.current);
    startBtn.current.disabled = false;
  };

  if (time === 0) {
    clrIntvl();
    counter += 1;
  }

  const handleInterval = (event) => {
    if (event === "start") {
      if (time === 0) setTime(() => 25 * 60);
      interval.current = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      startBtn.current.disabled = true;
    } else if (event === "pause") {
      clrIntvl();
    } else if (event === "stop" && time !== 0) {
      clrIntvl();
      setTime(() => 25 * 60);
    }
  };

  const minutes = padStart(Math.floor(time / 60));
  const seconds = padStart(time - minutes * 60);

  return (
    <div className={"pomodoro-app-wrapper"}>
      <div className={"pomodoro-app"}>
        <div className={"pomodoro-app-title"}>
          <span>Pomodoro timer</span>
          <span className={"pomodoro-success"}>
            Succesfully finished pomodoros: {counter}
          </span>
        </div>
        <div className={"pomodoro-app-timer"}>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>
        <div className={"pomodoro-app-buttons"}>
          <button
            className={"pomodoro-app-start"}
            onClick={() => handleInterval("start")}
            ref={startBtn}
          >
            START
          </button>
          <button
            className={"pomodoro-app-pause"}
            onClick={() => handleInterval("pause")}
          >
            PAUSE
          </button>
          <button
            className={"pomodoro-app-stop"}
            onClick={() => handleInterval("stop")}
          >
            STOP
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
