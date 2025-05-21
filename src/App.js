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
  const [error, setError] = useState("");
  const [advice, setAdvice] = useState("Click the dice below to get an advice");
  const [adviceID, setAdviceID] = useState("");

  const [fetchAdvice, setFetchAdvice] = useState(false);

  useEffect(
    function () {
      async function getAdvice() {
        setIsLoading(true);
        try {
          const res = await fetch(`https://api.adviceslip.com/advice`);
          if (!res.ok)
            throw new Error("Something went wrong getting your advice");

          const data = await res.json();

          setIsLoading(false);

          setAdvice(data.slip.advice);
          setAdviceID(data.slip.id);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getAdvice();
    },
    [fetchAdvice]
  );

  function handleFetchAdvice() {
    setAdvice("");
    setFetchAdvice(!fetchAdvice);

    console.log("fetching data");
  }

  return (
    <section className="advice-container">
      <p className="container-heading">advice #{adviceID}</p>
      <Advice advice={advice} loading={isLoading} errorMessage={error} />

      <img src={screenWidth > 768 ? divider2 : divider1} alt="" />

      <div className="dice-btn" onClick={handleFetchAdvice}>
        <img src={dice} alt="dice pic" />
      </div>
    </section>
  );
}

function Advice({ advice, loading, errorMessage }) {
  return (
    <p className="advice">
      <span>{"\u201C"}</span>
      {loading && "Getting advice..."}

      {!loading && advice}

      {errorMessage ? errorMessage : advice}
      <span>{"\u201D"}</span>
    </p>
  );
}
