import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB 에러"));
db.once("open", function () {
  console.log("DB 연결 성공");
});

const User = mongoose.model("User", { 
  username: String,
  email: String,
  password: String,
  password_confirm: String,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/join", async (req, res) => {
  const {
    username,
    email,
    password,
    password_confirm,
  } = req.body;

  const newUser = new User({ username, email, password, password_confirm });
  await newUser.save();

  const users = await User.find();
  console.log("Users from MongoDB:", users);

  res.send("Data operations done!");
});
