const express = require('express') //importa o framework Express
const app = express() //Inicializa a aplicação Express
const port = 8080 // Porta onde o servidor irá rodar

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//importa e inicializa o cliente Prisma

const swaggerUi = require('swagger-ui-express'); //interface visual para a documentação da API
const swaggerJsDoc = require('swagger-jsdoc'); //converte comentários no código em documentação Swagger

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
        description: "API documentation",
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./index.js"], // Update with the correct filename
  };
  //configuração das opções do swagger
  // index.js será onde o swagger irá procurar as rotas
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  // gera a documentação com base nas configurações definidas
  // adiciona um endpoint /api-docs que exibe a interface swagger


app.get('/', (req, res) => { //rota GET para a URL raiz
    //req: requisição recebida pelo servidor / res: resposta enviada ao cliente
    res.send('Hello World!') // resposta da requisição
})

app.listen(port, () => { //inicia o servidor na porta especificada
    console.log(`Example app listening on port ${port}`)
    //mensagem exibida no console quando o servidor rodar
})

app.post('/clientes', (req,res) => {
    //
});

app.get('/clientes', (req,res) => {
   //
});
  

  /**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint de Hello World
 *     description: Retorna um "Hello World!" message.
 *     responses:
 *       200:
 *         description: Resposta
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World!"
 */
//permite que o swagger gere automaticamente a documentação da rota /.
//summary: Resumo da funcionalidade.
//description: Explicação mais detalhada.
//responses: Descreve os possíveis retornos (neste caso, um código HTTP 200 com um texto "Hello World!").

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do cliente.
 *         nome:
 *           type: string
 *           description: Nome do cliente (único).
 *         dataCadastro:
 *           type: string
 *           format: date-time
 *           description: Data e hora do cadastro do cliente.
 *         ordensServico:
 *           type: array
 *           items:
 *             type: object
 *           description: Lista de ordens de serviço associadas ao cliente.
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente (deve ser único).
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro na validação dos dados
 *       500:
 *         description: Erro ao criar cliente
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Lista de clientes cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */

