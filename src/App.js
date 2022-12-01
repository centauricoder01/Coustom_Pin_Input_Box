import "./App.css";
import Pin from "./component/Pin";

function App() {
  const inputPin = "1 2 3 4";
  return (
    <div className="App">
      <Pin />
      <h1>OTP PIN = {inputPin}</h1>
    </div>
  );
}

export default App;
