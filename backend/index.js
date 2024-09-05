const express = require("express");
const cors = require("cors");

const app = express(); // express를 사용하여 app을 생성합니다.
app.use(express.json()); // JSON 파싱을 활성화합니다.
app.use(cors()); // CORS를 활성화합니다.

// /api/ping
app.use(require("./src/routes/routes")); // routes/routes.js를 사용합니다.
app.use(require("./src/helpers/response.helper").errorHandler); // 에러 핸들러를 사용합니다.

app.listen(8001, () => console.log("Server started on port 8001")); // 8001번 포트로 서버를 시작합니다.