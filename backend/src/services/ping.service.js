const { HttpResponse } = require("../helpers/response.helper.js");

const ping = () => {
  return new HttpResponse(200, "pong");
};

module.exports = {
  ping,
};