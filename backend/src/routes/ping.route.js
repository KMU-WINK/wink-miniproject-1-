const express = require("express");
const router = express.Router();
const pingController = require("../controllers/ping.controller");

router.get("/", pingController.ping); // GET api/ping 요청을 처리하는 pingController.ping 함수를 실행합니다.

module.exports = router; //노드몬