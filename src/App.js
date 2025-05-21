// imported app images
import divider1 from "./assets/pattern-divider-mobile.svg";
import divider2 from "./assets/pattern-divider-desktop.svg";
import dice from "./assets/icon-dice.svg";

export default function App() {
  return <AdviceGenerator />;
}

function AdviceGenerator() {
  return (
    <div className="app-container">
      <AdviceContainer />
    </div>
  );
}

function AdviceContainer() {
  return (
    <section className="advice-container">
      <p className="container-heading">advice</p>
      <Advice />

      <img src={divider1} alt="" />

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
