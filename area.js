const logoutBtn = document.getElementById("logout-btn");
const loginMessage = document.getElementById("mensagem-login");

const token = localStorage.getItem("token");

// checa se a string tem n blocos de 4 caracteres base64 válidos
// e opcionalmente um bloco final com 2 ou 3 caracteres seguidos de "="
// se a string terminar com 3 "=", a string é inválida
const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

// cabecalho = [0]
// payload = [1]
// assinatura = [2]

logoutBtn.addEventListener("click", voltaLogin);

function lerPayload(token) {
  // divide a string da entrada, separando-a pelo caractere "."
  const partes = token.split(".");

  // verifica se o número de partes no token é diferente de 3
  if (partes.length !== 3) {
    throw new Error("Token malformado");
  }

  // payload é o segundo item
  const payload = partes[1];

  // substitui caracteres para converter Base64URL para Base64 tradicional
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

  // const preenchido = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  // restaura o padding do Base64
  // adiciona "=" para que o tamanho da string seja um múltiplo de 4
  const preenchido = base64 + '='.repeat((4 - base64.length % 4) % 4);

  // transforma a string em informação binária
  // atob -> decodifica Base64 e retorna uma string em que cada caractere representa um byte
  // Uint8Array -> array que armazena inteiros sem sinal de 8 bits
  // from -> percorre a string retornada por atob e aplica uma função
  // para cada caractere, charCodeAt(0) retorna o valor correspondente ao byte
  const bytes = Uint8Array.from(atob(preenchido), (caractere) => caractere.charCodeAt(0));

  // decodifica a string Base64 em bytes, armazenados em um Uint8Array
  // TextDecoder interpreta a sequência de bytes como texto em UTF-8
  // importante para acentuação
  const texto = new TextDecoder().decode(bytes);

  // Converte o texto JSON em um valor JavaScript e o retorna.
  return JSON.parse(texto);
}

if (token) {
  try {
    // pega o json com o payload
    const dados = lerPayload(token);
    // pega o nome do usuário armazenado no payload
    const nome = dados.name;

    // exibe a mensagem na tela
    loginMessage.textContent = `Bem-vindo, ${nome}`;
  } catch (erro) {
    // se ocorrer um erro, retorna para a tela de login
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
} else {
  loginMessage.textContent = "Acesso negado. Token não encontrado.";
  loginMessage.style.color = "var(--clr-warning)";
  logoutBtn.textContent = "Realizar Login";
}

// volta para a tela inicial e remove o token do localStorage
function voltaLogin() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

//token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0
