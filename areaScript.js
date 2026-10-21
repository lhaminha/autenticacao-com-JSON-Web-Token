
const loginMessage = document.getElementById("mensagem-login");

const token = localStorage.getItem("token");

// cabecalho = [0]
// payload = [1]
// assinatura = [2]

function lerPayload(token) 
{
    const partes = token.split(".");

    if (partes.length !== 3) 
    {
        throw new Error("Token malformado");
    }

    const payload = partes[1];

    const base64 = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const preenchido = base64.padEnd
    (
        Math.ceil(base64.length / 4) * 4,
        "="
    );

    const bytes = Uint8Array.from
    (
        atob(preenchido),
        caractere => caractere.charCodeAt(0)
    );

    const texto = new TextDecoder().decode(bytes);

    return JSON.parse(texto);
}

if (token)
{
    try
    {
        const dados = lerPayload(token);
        const nome = dados.name;

        loginMessage.textContent = `Bem-vindo, ${nome}`;
    }
    catch (erro)
    {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
}
else
{
    loginMessage.textContent = "Token não encontrado.";
    window.location.href = "index.html";
}

//Login realizado com sucesso!!
//Login negado :( 

function voltaLogin(){
    localStorage.removeItem("token");
    window.location.href="index.html";
}

//token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0
