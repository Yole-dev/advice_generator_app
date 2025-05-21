// imported app images
import divider1 from "./assets/pattern-divider-mobile.svg";
import divider2 from "./assets/pattern-divider-desktop.svg";
import dice from "./assets/icon-dice.svg";
import { useState, useEffect } from "react";

export default function App() {
  return <AdviceGenerator />;
}

// creating a custom hook to watch the screen width change
function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(
    function () {
      function handleResize() {
        //setting the width state to the current window size
        setWidth(window.innerWidth);
      }

      //Eventlistener watching for window resize event
      window.addEventListener("resize", handleResize);

      //cleaning up the Effect, after getting the window size by removing the Event listener
      return () => window.removeEventListener("resize", handleResize);
    },
    [width]
  );

  return width;
}

function AdviceGenerator() {
  return (
    <div className="app-container">
      <AdviceContainer />
    </div>
  );
}

function AdviceContainer() {
  const screenWidth = useScreenWidth();

  return (
    <section className="advice-container">
      <p className="container-heading">advice {}</p>
      <Advice />

      <img src={screenWidth > 768 ? divider2 : divider1} alt="" />

      <div className="dice-btn">
        <img src={dice} alt="dice pic" />
      </div>
    </section>
  );
}

function Advice() {
  return (
    <p className="advice">
      <span>{"\u201C"}</span>
      advice
      <span>{"\u201D"}</span>
    </p>
  );
}
