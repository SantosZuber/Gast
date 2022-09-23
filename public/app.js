const socket = io.connect();
document.getElementById("user-input").onsubmit = function (e) {
  e.preventDefault();
};
document.getElementById("login-form").onsubmit = function () {
  socket.emit("user", document.getElementById("user-input").value);
};
