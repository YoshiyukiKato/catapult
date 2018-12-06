import http from "http";

export const targetServer = http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
});
