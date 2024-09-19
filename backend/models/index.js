const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// sequelize 초기화
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 모델 가져오기
const User = require('./user'); // 함수 호출하지 않음
const Post = require('./post'); // 함수 호출하지 않음
const Hashtag = require('./hashtag');
const Story = require('./story');

// db 객체 생성
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User.init(sequelize, Sequelize); // 모델을 초기화
db.Post = Post.init(sequelize, Sequelize); // 모델을 초기화
db.Hashtag = Hashtag.init(sequelize, Sequelize); // 모델을 초기화
db.Story = Story.init(sequelize, Sequelize); // 모델을 초기화

// 모델 간의 관계 설정
if (User.associate) User.associate(db);
if (Post.associate) Post.associate(db);
if (Hashtag.associate) Hashtag.associate(db);
if (Story.associate) Story.associate(db);

module.exports = db;
