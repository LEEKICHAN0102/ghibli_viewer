import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

dotenv.config();

const PORT = process.env.PORT; // 8080
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false, // HTTPS에서만 쿠키 전송
  },
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
  }),
}));


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

app.get("/user", async (req, res) => {
  if (req.session && req.session.user) {
    // 세션에 사용자 정보가 있으면 반환
    const user = await req.session.user;
    console.log(user);
    res.status(200).json({ user });
  } else {
    // 세션에 사용자 정보가 없으면 로그인되지 않은 상태
    res.status(401).json({ message: "로그인되지 않은 상태입니다." });
  }
});

app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  console.log(req.session);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user; // 세션에 사용자 정보 저장
    res.status(200).json({ message: '로그인 성공', user });
  } else {
    res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
  }
});

app.post("/join", async (req, res) => {
  const {
    username,
    email,
    password,
    password_confirm,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPassword_confirm = await bcrypt.hash(password_confirm, 10);

  const newUser = new User({ username, email, password: hashedPassword, password_confirm: hashedPassword_confirm });
  await newUser.save();

  const users = await User.find();
  console.log("Users from MongoDB:", users);

  res.send("Data operations done!");
});

app.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("세션 삭제 중 에러:", error);
      res.status(500).json({ message: '로그아웃 실패' });
    } else {
      res.status(200).json({ message: '로그아웃 성공' });
    }
  });
});
