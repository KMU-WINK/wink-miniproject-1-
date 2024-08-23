const pingService = require("../services/ping.service");

const ping = (req, res, next) => {
  next(pingService.ping()); // pingService의 ping 함수를 실행하고, 그 결과를 다음 미들웨어로 넘깁니다.
};

module.exports = {
  ping,
