const socket = io.connect();
document.querySelector(".guest-btn").addEventListener("click", () => {
  document.querySelector("h1").style.color = "green";
});
