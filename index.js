const express = require('express');
const { PrismaClient } = require('@prisma/client');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const prisma = new PrismaClient();
const app = express();
const port = 8080;

app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clientes',
      version: '1.0.0',
      description: 'API para criação e listagem de clientes',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./index.js'], // Caminho para o arquivo que contém as anotações do Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: João Silva
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: João Silva
 *                 dataCadastro:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-25T12:00:00.000Z
 *       400:
 *         description: Erro ao criar cliente
 *       500:
 *         description: Erro interno do servidor
 */
app.post('/clientes', async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
  }

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nome,
      },
    });
    res.status(201).json(cliente);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Já existe um cliente com esse nome.' });
    }
    res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
  }
});

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   dataCadastro:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-10-25T12:00:00.000Z
 *                   ordensServico:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         clienteServicoId:
 *                           type: integer
 *                           example: 1
 *                         prestadorServicoId:
 *                           type: integer
 *                           example: 1
 *                         dataCadastro:
 *                           type: string
 *                           format: date-time
 *                           example: 2023-10-25T12:10:00.000Z
 *                         dataAgendamento:
 *                           type: string
 *                           format: date-time
 *                           example: 2023-10-30T14:00:00.000Z
 *       500:
 *         description: Erro interno do servidor
 */
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: {
        ordensServico: true,
      },
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes', details: error.message });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
});