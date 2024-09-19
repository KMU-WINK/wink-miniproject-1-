const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('miniproject_wink', 'root', 'ljy74377437', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // 콘솔에 SQL 로그 출력 방지
});

module.exports = sequelize;
