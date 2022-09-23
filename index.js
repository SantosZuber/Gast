const { Server: HTTPServer } = require("http");
const express = require("express");
const { Server: SocketServer } = require("socket.io");
const path = require("path");

const app = express();
const httpServer = HTTPServer(app);
const io = new SocketServer(httpServer);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {});

httpServer.listen(8080, () => {
  console.log("Server open, port: ", 8080);
});
