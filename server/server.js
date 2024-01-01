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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

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

export const User = mongoose.model("User", { 
  username: String,
  email: String,
  password: String,
  password_confirm: String,
});

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User 모델과 연결
  },
  content: String,
  filmId: String,
});

export const Comment = mongoose.model("Comment", commentSchema);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/user", async (req, res) => {
  if (req.session && req.session.user) {
    // 세션에 사용자 정보가 있으면 반환
    const user = await req.session.user;
    res.status(200).json({ user });
  } else {
    // 세션에 사용자 정보가 없으면 로그인되지 않은 상태
    res.status(401).json({ message: "로그인되지 않은 상태입니다." });
  }
});

app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user; // 세션에 사용자 정보 저장
    res.status(200).json({ message: '로그인 성공', user });
  } else if(!user) {
    res.status(401).json({ message: '존재하지 않는 이메일 입니다.' });
  } else if(! await bcrypt.compare(password, user.password)){
    res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
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
  console.log("MongoDB:", users);

  res.send("계정 생성 완료!");
});

app.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("세션 삭제 중 에러:", error);
      res.status(500).json({ message: '로그아웃 실패' });
    } else {
      res.clearCookie('connect.sid'); // connect.sid는 세션 쿠키의 이름
      res.status(200).json({ message: '로그아웃 성공' });
    }
  });
});

app.get("/comment/:filmId", async (req, res) => {
  const { filmId } = req.params;

  try {
    const comments = await Comment.find({ filmId }).populate('userId', 'username');
    // 해당 filmId에 대한 모든 댓글을 가져옵니다.
    const commentData = comments.map(comment => ({
      contentId: comment._id,
      content: comment.content,
      username: comment.userId.username,
    }));

    res.status(200).json(commentData);
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: '댓글을 가져오는 중 에러가 발생했습니다.' });
  }
});

app.post("/comment/:filmId", async (req, res) => {
  const { filmId } = req.params;
  const { content } = req.body;
  const userId = req.session.user._id;

  if (!userId) {
    return res.status(401).json({ message: '로그인이 필요합니다.' });
  }

  try {
    const newComment = new Comment({ userId, content, filmId });
    await newComment.save();

    const comments = await Comment.find({ filmId }).populate('userId', 'username');
    // 해당 filmId에 대한 모든 댓글을 가져옵니다.
    console.log("Comments from MongoDB:", comments);

    res.status(201).json({ message: '댓글이 작성되었습니다.' });
  } catch (error) {
    console.error("Error while saving comment:", error);
    res.status(500).json({ message: '서버 오류로 댓글을 저장하지 못했습니다.' });
  }
});

app.post("/comment/:filmId/delete", async (req, res) => {
  const { filmId } =req.params;
  const { commentId } = req.body;
  console.log(commentId);
  console.log(filmId);

  try {
    // 댓글 ID를 사용하여 삭제
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "댓글 삭제 성공" });
  } catch (error) {
    console.error("에러 발생:", error);
    res.status(500).json({ message: '댓글 삭제 실패' });
  }
});