const socket = io.connect();
document.getElementById("user-input").onsubmit = function (e) {
  e.preventDefault();
};
document.getElementById("login-form").onsubmit = function (e) {
  e.preventDefault();
  socket.emit("login", document.getElementById("user-input").value);
};
