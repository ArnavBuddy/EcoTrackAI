const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Calculate Carbon Footprint
app.post("/calculate", (req, res) => {
  try {
    const { carKm, electricityUnits, foodType } = req.body;

    // Validation
    if (carKm < 0 || electricityUnits < 0) {
      return res.status(400).json({
        error: "Values cannot be negative",
      });
    }

    // Transport Emissions
    const transport = carKm * 0.192;

    // Electricity Emissions
    const electricity = electricityUnits * 0.82;

    // Food Emissions
    let food = 0;

    if (foodType === "vegetarian") {
      food = 20;
    } else if (foodType === "mixed") {
      food = 50;
    } else if (foodType === "meat") {
      food = 100;
    }

    // Total Emissions
    const total = transport + electricity + food;

    // Suggestion Logic
    let suggestion = "";

    if (transport > electricity && transport > food) {
      suggestion =
        "Transportation is your biggest emission source. Try carpooling, cycling, or public transport.";
    } else if (electricity > transport && electricity > food) {
      suggestion =
        "Electricity usage is high. Switch off unused appliances and use LED bulbs.";
    } else {
      suggestion =
        "Food contributes most to your emissions. Consider more plant-based meals.";
    }

    // Eco Score Logic
    let ecoScore = 100;

    if (total > 300) {
      ecoScore = 30;
    } else if (total > 200) {
      ecoScore = 50;
    } else if (total > 100) {
      ecoScore = 75;
    } else {
      ecoScore = 90;
    }

    // Biggest Contributor
    let biggestSource = "";

    if (transport > electricity && transport > food) {
      biggestSource = "Transportation";
    } else if (electricity > transport && electricity > food) {
      biggestSource = "Electricity";
    } else {
      biggestSource = "Food";
    }

    res.json({
      transport,
      electricity,
      food,
      total,
      ecoScore,
      suggestion,
      biggestSource,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
