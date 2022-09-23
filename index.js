const { Server: HTTPServer } = require("http");
const express = require("express");
const { Server: SocketServer } = require("socket.io");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const app = express();
const httpServer = HTTPServer(app);
const io = new SocketServer(httpServer);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {});

app.post("/login", upload.single("image"), (req, res) => {
  res.redirect("/");
});

httpServer.listen(8080, () => {
  console.log("Server open, port: ", 8080);
});
