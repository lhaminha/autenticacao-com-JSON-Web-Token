Identificação do Grupo

Nome: Heloisa Teixeira Frois Pereira — RA: 26006077
Nome: Letícia Leal Gervenutti — RA: 26010371
Nome: Lucas Nogami Tung — RA: 26020394

Descrição das funcionalidades

Este projeto tem por objetivo simular o fluxo de login para acesso de uma área restrita. A simulação foi feita utilizando armazenamento local e validação de um JWT (JSON Web Token). O projeto não contempla a verificação de logins válidos, apenas sua existência.

Instruções para executar

Para executar o projeto, é necessário abrí-lo por meio de um servidor http e iniciá-lo em index.html.

Questão 1: Quais são as três partes de um JWT e qual é a função de cada uma?

O JWT é divido em:
- Header: Define o tipo de token e o algoritmo utilizado para gerar a assinatura
- Payload: Contém informações (claims) associadas ao token, como o nome do usuário, permissões, preferências e prazos de validade
- Signature: Permite verificar a integridade e a autenticidade do token

Questão 2: Por que os dados presentes no Payload podem ser visualizados mesmo sem conhecer a chave secreta?

O Payload de um JWT é codificado, e não criptografado, uma vez que seu propósito não é conter informações sigilosas. Como a codificação não exige uma chave secreta para ser revertida, qualquer pessoa que tenha acesso ao token pode visualizar suas informações. A assinatura é gerada a partir do Header e do Payload, utilizando uma chave criada separadamente. Ela permite verificar se o conteúdo foi alterado e se foi assinado por uma entidade que possui a chave necessária. Dessa forma, o servidor pode verificar a integridade do token e confiar em seu emissor, desde que também valide as demais condições de aceitação do token.

Questão 3: Qual é a diferença entre codificar, criptografar e assinar informações?

Codificar consiste no processo de transformação de dados em outro formato, por exemplo, para facilitar seu processamento por sistemas ou sua transferência através da rede. Algoritmos de codificação são reversíveis, ou seja, qualquer um com a posse dos dados codificados e o algoritmo usado para codificá-los pode facilmente obter os dados originais. Por exemplo, o algoritmo base64 é usado para converter dados binários para texto utilizando apenas 64 símbolos ASCII. Já criptografar é o processo de transformar dados em algo que somente usuários autorizados são capazes de compreender. O objetivo da criptografia é a confidencialidade. Assim, obter os dados originais sem conhecimento da chave é praticamente impossível. Por fim, assinar informações significa criar uma assinatura que comprove a autenticidade das informações enviadas. Assinar não esconde os dados, apenas providencia um meio de verificar se os dados enviados foram assinados por alguém que possui a chave correspondente e se não foram adulterados.

Questão 4: O que acontece com a assinatura quando o conteúdo do Payload é alterado sem gerar uma nova assinatura?

A verificação da assinatura falha, uma vez que é gerada a partir do conteúdo do Header e do Payload. Qualquer alteração nessas partes modifica o conteúdo utilizado na verificação e invalida a assinatura original.

Questão 5: Qual é a diferença entre verificar que um token existe no localStorage e validar sua autenticidade?

Verificar se um token existe no localStorage consiste em consultar se há um valor armazenado localmente, por exemplo, utilizando localStorage.getItem("token"). Isso não garante que o token seja válido ou autêntico. Validar a autenticidade exige verificar a assinatura do JWT com a chave apropriada, além de verificar sua validade e demais condições necessárias. A mera presença do token no localStorage não garante que ele seja legítimo, não tenha sido adulterado ou ainda possa ser utilizado para acessar recursos protegidos.

Questão 6: Qual é a finalidade do campo exp e o que acontece quando um JWT ultrapassa seu prazo de validade?

O campo exp indica o instante a partir do qual o JWT não deve mais ser aceito, expresso em segundos desde 1º de janeiro de 1970 (Unix time). Quando o token atinge ou ultrapassa esse instante, o servidor deve rejeitá-lo. Assim, a expiração limita o período de utilização do token e reduz a janela de oportunidade para ataques envolvendo tokens comprometidos.

Descrição dos testes realizados

1. Inserir o login e a senha
2. Inserir apenas o login
3. Inserir apenas a senha
4. Não inserir nem o login, nem a senha
5. Acessar area.html pela URL
6. Modificar o token manualmente
7. Logout
8. Todos os testes acima após o logout
9. Verificação da presença do token no localStorage por meio de DevTools
10. Verificação da assinatura e da decodificação por meio do site jwt.io
11. Verificação de erros no console

Limitações de segurança

O presente projeto não contempla a verificação da autenticidade do token armazenado, apenas sua existência e sua integridade. Além disso, não há verificações quanto à validade do token, de forma que o utilizado como exemplo contém uma validade expirada. Essas limitações representam riscos graves em produção, uma vez que torna a aplicação suscetível a dissimulações de identidade. No entanto, essas verificações são normalmente realizadas pelo backend do servidor, aspecto fora do escopo do projeto.
