import { useState } from "react";
import axios from "axios";

function App() {
  const [carKm, setCarKm] = useState("");
  const [electricityUnits, setElectricityUnits] = useState("");
  const [goal, setGoal] = useState("");
  const [foodType, setFoodType] = useState("vegetarian");
  const [result, setResult] = useState(null);

  const calculateFootprint = async () => {
    try {
      const response = await axios.post("http://localhost:5000/calculate", {
        carKm: Number(carKm),
        electricityUnits: Number(electricityUnits),
        foodType,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #444",
        borderRadius: "12px",
      }}
    >
      <h1>🌍 EcoTrack AI</h1>

      <label>Car Distance (KM)</label>
      <br />
      <input
        type="number"
        placeholder="Enter Car KM"
        value={carKm}
        onChange={(e) => setCarKm(e.target.value)}
      />

      <br />
      <br />

      <label>Electricity Units (kWh)</label>
      <br />
      <input
        type="number"
        placeholder="Enter Electricity Units"
        value={electricityUnits}
        onChange={(e) => setElectricityUnits(e.target.value)}
      />

      <br />
      <br />

      <label>Monthly Goal (kg CO₂)</label>
      <br />
      <input
        type="number"
        placeholder="Enter Monthly Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <br />
      <br />

      <label>Food Type</label>
      <br />
      <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
        <option value="vegetarian">Vegetarian</option>
        <option value="mixed">Mixed</option>
        <option value="meat">Meat</option>
      </select>

      <br />
      <br />

      <button
        onClick={calculateFootprint}
        aria-label="Calculate Carbon Footprint"
      >
        Calculate
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #333",
            borderRadius: "10px",
          }}
        >
          <h2>📊 Results</h2>

          <p>🚗 Transport: {result.transport} kg CO₂</p>
          <p>⚡ Electricity: {result.electricity} kg CO₂</p>
          <p>🍽️ Food: {result.food} kg CO₂</p>

          <h3>🌎 Total Footprint: {result.total} kg CO₂</h3>

          <h3>💡 Suggestion</h3>
          <p>{result.suggestion}</p>

          <h3>🏆 Eco Score: {result.ecoScore}/100</h3>

          <p>
            {result.ecoScore >= 80
              ? "🌱 Eco Champion"
              : result.ecoScore >= 60
                ? "♻️ Green Citizen"
                : "⚠️ Needs Improvement"}
          </p>

          {goal && Number(goal) > 0 && (
            <>
              <h3>🎯 Goal Tracking</h3>

              <p>Target Goal: {goal} kg CO₂</p>

              <p>
                Difference: {Math.abs(Number(goal) - result.total).toFixed(1)}
                kg CO₂
              </p>

              {result.total <= Number(goal) ? (
                <p>
                  ✅ Great! You are {(Number(goal) - result.total).toFixed(1)}
                  kg CO₂ below your goal.
                </p>
              ) : (
                <p>
                  ⚠️ You need to reduce{" "}
                  {(result.total - Number(goal)).toFixed(1)}
                  kg CO₂ to reach your goal.
                </p>
              )}
            </>
          )}

          <h3>📌 Biggest Contributor</h3>
          <p>{result.biggestSource}</p>
        </div>
      )}
    </div>
  );
}

export default App;
