const token = localStorage.getItem("token");
const username = document.getElementById("username");

if (token) {
  const payload = token.split(".")[1];

  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

  const user = JSON.parse(json);
  username.textContent = user.name;
} else {
  window.location.href = "index.html";
}
