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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [advice, setAdvice] = useState("");
  const [adviceID, setAdviceID] = useState("");

  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(
    function () {
      async function getAdvice() {
        try {
          setIsLoading(true);
          setError(null);

          const res = await fetch(`https://api.adviceslip.com/advice`);
          console.log(res);
          if (!res.ok) throw new Error("");

          const data = await res.json();

          setIsLoading(false);

          setAdvice(data.slip.advice);
          setAdviceID(`#${data.slip.id}`);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getAdvice();
    },
    [fetchTrigger]
  );

  function handleFetchAdvice() {
    setAdvice("");
    setAdviceID("");
    setError(null);
    setFetchTrigger(!fetchTrigger);
  }

  return (
    <section className="advice-container">
      <p className="container-heading">advice {adviceID}</p>
      <Advice advice={advice} loading={isLoading} error={error} />

      <img src={screenWidth > 768 ? divider2 : divider1} alt="" />

      <div className="dice-btn" onClick={handleFetchAdvice}>
        <img src={dice} alt="dice pic" />
      </div>
    </section>
  );
}

function Advice({ advice, loading, error }) {
  return (
    <p className="advice">
      <span>{"\u201C"}</span>

      {loading && "Getting advice..."}

      {!loading && advice}

      {error && error}

      <span>{"\u201D"}</span>
    </p>
  );
}
