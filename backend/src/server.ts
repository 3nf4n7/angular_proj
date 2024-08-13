import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
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

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(getnerateTokenResponse(user));
  } else {
    res.status(400).send("Имя пользователя или пароль неверные");
  }
});

const getnerateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "RandomText",
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

const port = 5000;
app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
