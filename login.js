const pwd = document.getElementById("pwd");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submit-btn");
const validate = document.getElementById("validate");
const validateMsg = document.getElementById("validate");

const fakeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const emailVal = email.value;
  const pwdVal = pwd.value;
  const warningTxt = "Informe seu e-mail e senha para fazer login.";

  console.log("hello");

  if (emailVal && pwdVal) {
    localStorage.setItem("token", fakeToken);
    paginaAreaRestrita();
  } else {
    validate.classList.remove("hidden");
    validate.classList.add("warning");
    validate.ariaHidden = "false";
    validateMsg.textContent = warningTxt;
  }
});

function paginaAreaRestrita() {
  window.location.href = "area.html";
}
