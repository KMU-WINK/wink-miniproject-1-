const express = require("express");
const router = express.Router();

router.use("/ping", require("./ping.route"));

router.get('/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

module.exports = router;