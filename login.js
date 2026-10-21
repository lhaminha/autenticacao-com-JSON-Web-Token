const pwd = document.getElementById("pwd");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submit-btn");
const validate = document.getElementById("validate");
const validateMsg = document.getElementById("validate");

// token de exemplo
const fakeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";

// identifica um clique no botão de login
submitBtn.addEventListener("click", (e) => {
  // previne o comportamento padrão
  e.preventDefault();
  const emailVal = email.value;
  const pwdVal = pwd.value;
  const warningTxt = "Informe seu e-mail e senha para fazer login.";

  // se houver email e senha, o login é realizado
  if (emailVal && pwdVal) {
    // armazena o token no localStorage
    localStorage.setItem("token", fakeToken);
    paginaAreaRestrita();
  } else {
    // caso contrário, uma mensagem é exibida
    // pedindo para o usuário inserir suas informações
    validate.classList.remove("hidden");
    validate.classList.add("warning");
    validate.ariaHidden = "false";
    validateMsg.textContent = warningTxt;
  }
});

// direciona para a área restrita
function paginaAreaRestrita() {
  window.location.href = "area.html";
}
