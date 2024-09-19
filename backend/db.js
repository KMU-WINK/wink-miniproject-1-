const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',  // 데이터베이스 호스트
  user: 'root',       // MySQL 사용자명
  password: 'ljy74377437',  // MySQL 비밀번호
  database: 'miniproject_wink'  // 사용 중인 데이터베이스명
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL 연결 성공!');
});

module.exports = db;
