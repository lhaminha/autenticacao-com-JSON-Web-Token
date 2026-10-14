const email = document.getElementById("email");
const emailVerify = document.getElementById("email-verify");

const pwd = document.getElementById("pwd");
const pwdVerify = document.getElementById("pwd-verify");

const submitBtn = document.getElementById("submit-btn");

const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


//Esconde a mensagem de sucesso de envio ao modificar algum campo
email.addEventListener("input", () => hideMsg(msgSucesso));

pwd.addEventListener("input", () => hideMsg(msgSucesso));

// Validação de e-mail
email.addEventListener("focus", () => {
  hideMsg(emailVerify);
});

email.addEventListener("blur", () => {
  const successMsg = "E-mail válido";
  const warningMsg = "E-mail inválido";

  showMsg(emailVerify);

  if (!emailRegex.test(email.value)) {
    emailVerify.textContent = warningMsg;
    invalidField(email);
  } else {
    emailVerify.textContent = successMsg;
    validField(email);
  }

  revalidar();
});

// Validação da senha
pwd.addEventListener("focus", () => {
    hideMsg(pwdverify);
});

pwd.addEventListener("blur", () => {
    const succesPwd = "Senha válida";
    const warningPwd = "Senha inválida";

    showMsg(pwdVerify);

    if(pwd.value.length <8){
        pwdVerify.textContent = warningPwd;
        invalidField(pwd);
    } else{
        pwdVerify.textContent = succesPwd;
        validField(pwd);
    }

    revalidar();
});

submitBtn.addEventListener("click", (e) => {
  preventDefault();
  limpar();
})

// Funções auxiliares
function debounce(fn, delay = 200) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

function showMsg(verify) {
  verify.classList.remove("hidden");
  verify.setAttribute("aria-hidden", "false");
}

function hideMsg(verify) {
  verify.classList.add("hidden");
  verify.setAttribute("aria-hidden", "true");
}

function invalidField(field) {
  field.setAttribute("aria-invalid", "true");
}

function validField(field) {
  field.setAttribute("aria-invalid", "false");
}

function limpar() {
  email.value = "";
  pwd.value = "";

  const inputs = [email, pwd];
  inputs.forEach(input => {
    input.removeAttribute("aria-invalid");
  });

  hideMsg(emailVerify);
  hideMsg(pwdVerify);
}

function revalidar() {
  const okEmail = emailRegex.test(email.value);
  const okSenha = pwd.value.length >= 8;

  const okTudo = okEmail && okSenha;

  if (okTudo) {
    submitBtn.disabled = false;
  } else{
    submitBtn.disabled = true;
  }
}

submitBtn.addEventListener("click", (e) =>{
  e.preventDefault();

  limpar();
});
