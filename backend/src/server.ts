import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:query", (req, res) => {
  const query = req.params.query;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );

  res.send(foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/tag/:tag", (req, res) => {
  const tag = req.params.tag;
  const foods = sample_foods.filter((food) => food.tags?.includes(tag));
  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const food = sample_foods.find((food) => food.id == foodId);
  res.send(food);
});

const port = 5001;
app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
