import { useState } from "react";

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const handleIncrement = () => {
    const newCount = count + step;
    setCount(newCount);
  };
  const handleDecrement = () => {
    const newCount = count - step;
    setCount(newCount);
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStep(Number(e.target.value));
  };

  const handleReset = () => {
    setCount(0);
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
    </div>
  );
}
export default AdvancedCounter;
