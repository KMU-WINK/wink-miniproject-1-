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

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

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

app.post('/api/submit', (req, res) => {
    const { nickname, story } = req.body;

    // 입력값 검증 (옵션)
    if (!nickname || !story) {
        return res.status(400).json({ error: '닉네임과 이야기는 필수 항목입니다.' });
    }

    // 데이터베이스에 데이터 삽입
    const query = 'INSERT INTO stories (nickname, story) VALUES (?, ?)';
    connection.query(query, [nickname, story], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: '서버 오류입니다.' });
        }
        res.status(200).json({ message: '데이터가 성공적으로 저장되었습니다.' });
    });
});


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
app.use('/writingpage', authRouter);
app.use('/continuingpage', postRouter); //수정페이지
app.use('/Top10', postRouter);
//app.use('/user', userRouter);


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