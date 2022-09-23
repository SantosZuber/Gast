const { Server: HTTPServer } = require("http");
const express = require("express");
const { Server: SocketServer } = require("socket.io");
const path = require("path");
const multer = require("multer");
const { urlencoded } = require("express");

//Middleware
const app = express();
const httpServer = HTTPServer(app);
const io = new SocketServer(httpServer);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Declaring server storages
const users = [];
//Configuring multer to save the img files of the users.
class Uploader {
  constructor() {
    const storage = function () {
      //No anda la promise, tratar de ver la forma de pasar el dato de la foto al io.on() para asociarlo al usuario. Con una promise
      //seria lo ideal porque puedo esperar con el .then para que no se ejecute antes el socket y luego con el then le paso la ruta de la imaagen
      return new Promise((res, rej) => {
        multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, "Images");
          },
          filename: (req, file, cb) => {
            let fileExt = path.extname(file.originalname);
            if (fileExt == ".jpg" || fileExt == ".png" || fileExt == ".jpeg") {
              let filename = Date.now() + path.extname(file.originalname);
              cb(null, filename);
              let fileURL = path.join("Images", filename);
              res(fileURL);
            }
          },
        });
      });
    };
    this.upload = multer({ storage: storage });
  }
}
const uploader = new Uploader();

//Socket.io
io.on("connection", (socket) => {
  let myUser;
  //LOGIN
  //Una vez se hace el submit del login desde el front ->
  socket.on("user", (username) => {
    users.push({ username: username, id: socket.id });
    myUser = users.filter((e) => {
      if (e.id == socket.id) {
        if (e.picture == undefined) {
          uploader.storage().then((data) => {
            console.log(data);
            e.picture = "picture";
          });
        }
        return e;
      }
    });
  });
});

//Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/chat", (req, res) => {
  res.render("chat");
});
app.post("/login", uploader.upload.single("image"), (req, res) => {
  res.redirect("/chat");
});

httpServer.listen(8080, () => {
  console.log("Server open, port: ", 8080);
});
