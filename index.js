const { Server: HTTPServer } = require("http");
const express = require("express");
const { Server: SocketServer } = require("socket.io");
const path = require("path");

//Middleware
const app = express();
const httpServer = HTTPServer(app);
const io = new SocketServer(httpServer);

//app.set("views", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Declaring server data
const users = [];

//Socket.io
io.on("connection", (socket) => {
  let myUser = {};
  myUser.id = socket.id;
  //LOGIN
  //Una vez se hace el submit del login desde el front ->
  socket.on("login", (username) => {
    validateUsername(username);
    myUser.username = username;
    users.push(myUser);
  });
});

function validateUsername(data) {
  if (data.includes("<", ">", "*", "/")) {
    data = "Hacker";
  } else if (data.includes(" ")) {
    data = "Hacker";
  } else if (data === null) {
    data = "Hacker";
  }
}
function validateMsg(data) {
  if (data.includes("<", ">", "*", "/")) {
    data = "There was an error on this message";
  } else if (data === null) {
    data = "There was an error on this message";
  }
}

httpServer.listen(8080, () => {
  console.log("Server open, port: ", 8080);
});
