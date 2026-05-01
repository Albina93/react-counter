import { useState, useEffect } from "react";

function AdvancedCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved ? Number(saved) : 0;
  });
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<number[]>(() => {
    const saved = localStorage.getItem("history");
    console.log("Loading history from localstorage: ", saved);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);
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
