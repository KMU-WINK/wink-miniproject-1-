const express = require("express");
const router = express.Router(); // express의 Router를 사용하여 router를 생성합니다.

router.use("/api", require("./api.route")); // /api 경로로 API 라우트를 사용합니다.

module.exports = router;   // router를 내보냅니다.
