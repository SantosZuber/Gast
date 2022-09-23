const { Server: HTTPServer } = require("http");
const express = require("express");
const { Server: SocketServer } = require("socket.io");
const path = require("path");
const multer = require("multer");
const { ppid } = require("process");
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/chat", (req, res) => {
  res.render("chat");
});
app.post("/login", upload.single("image"), (req, res) => {
  res.redirect("/chat");
});

httpServer.listen(8080, () => {
  console.log("Server open, port: ", 8080);
});
