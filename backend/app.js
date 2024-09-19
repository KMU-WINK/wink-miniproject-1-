const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const db = require('./db');
const sql = 'SELECT title, nickname, content FROM stories';

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const continuingRouter = require('./routes/continuingpage');
const writingRouter = require('./routes/writingpage');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const getStoriesQuery = 'SELECT title, nickname, content FROM stories';

const app = express();

app.use(cors());

passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/detailpage', postRouter);
app.use('/writingpage', writingRouter);
app.use('/continuingpage', continuingRouter); //수정페이지
app.use('/Top10', postRouter);
//app.use('/user', userRouter);\

app.post('/continuingpage', (req, res) => {
  const { nickname, story, storyId } = req.body;

  // storyId로 기존 스토리 찾기
  const findStoryQuery = 'SELECT content FROM stories WHERE id = ?';
  
  db.query(findStoryQuery, [storyId], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('스토리를 찾는 중 오류가 발생했습니다.');
      }

      if (result.length === 0) {
          return res.status(404).send('스토리를 찾을 수 없습니다.');
      }

      // 기존 스토리에 새로운 내용을 이어붙임
      const existingStoryContent = result[0].content;
      const updatedStoryContent = `${existingStoryContent}\n\n${nickname}: ${story}`;

      // 스토리 업데이트 쿼리
      const updateStoryQuery = 'UPDATE stories SET content = ? WHERE id = ?';

      db.query(updateStoryQuery, [updatedStoryContent, storyId], (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).send('스토리를 업데이트하는 중 오류가 발생했습니다.');
          }

          res.status(200).send('스토리가 성공적으로 이어졌습니다.');
      });
  });
});

app.get('/api/stories', (req, res) => {
  const sql = 'SELECT title, nickname, content FROM stories';

  db.query(sql, (err, results) => {
      if (err) {
          console.error('DB 쿼리 오류:', err);
          return res.status(500).json({ error: '데이터베이스 오류' });
      }
      res.json(results);
  });
});

// catch-all 라우트 추가
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});