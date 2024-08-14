import "./App.css";
import translation from "./translation";

function App() {
  return (
    <div className="main">
      <h1>{translation.title}</h1>
      <h2>{translation.subTitle}</h2>
      <img src={translation.homeImage} alt="any image" />
    </div>
  );
}

export default App;
