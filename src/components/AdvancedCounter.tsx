import { useState, useEffect } from "react";

function AdvancedCounter() {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem("count");
    return saved ? Number(saved) : 0;
  });
  const [step, setStep] = useState<number>(() => {
    const saved = localStorage.getItem("step");
    return saved ? Number(saved) : 1;
  });
  const [history, setHistory] = useState<number[]>(() => {
    const saved = localStorage.getItem("history");
    // console.log("Loading history from localstorage: ", saved);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem("step", String(step));
  }, [step]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    // define the function that handles the key press
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log("Key pressed: ", event.key);

      // if event.key is "ArrowUp" then call handleIncrement
      if (event.key === "ArrowUp") {
        handleIncrement();
      }
      // if event.key is "ArrowDown" then call handleDecrement
      if (event.key === "ArrowDown") {
        handleDecrement();
      }
    };
    // tell the browser to start listening
    document.addEventListener("keydown", handleKeyDown);

    // return a cleanup function that stops the listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [count, step]);

  const handleIncrement = () => {
    const newCount = count + step;
    setCount(newCount);
    setHistory((prev) => [...prev, newCount]);
  };
  const handleDecrement = () => {
    const newCount = count - step;
    setCount(newCount);
    setHistory((prev) => [...prev, newCount]);
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStep(Number(e.target.value));
  };

  const handleReset = () => {
    setCount(0);
    setHistory([]);
    setStep(1);
  };

  return (
    <div className="container">
      <h3>Current count: {count}</h3>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        <label>
          Step Value:
          <input type="number" value={step} onChange={handleStepChange} />
        </label>
      </div>
      <p>Count history:</p>
      <ul>
        {history.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
export default AdvancedCounter;
