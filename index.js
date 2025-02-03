const express = require('express') //importação do módulo express
const app = express() //criação da instancia app que permite a definição de rotas e configuração do servidor
const port = 8080 //porta na qual o servidor irá executar as requisições HTTP

app.get('/', (req, res) => { 
    res.send('Hello world!') 
})
//app.get define uma rota HTTP do tipo GET
// '/' indica que essa rota será acessada quando um usuário entrar na URL raiz do servidor
//req = dados da requisição HTTP; res = objeto de resposta HTTP
//res.send contém a resposta que será enviada após a requisição 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//app.listen inicia o servidor Express e o faz escutar requisições na porta especificada
//console.log mostra a mensagem no terminal indicando que o servidor está rodando
