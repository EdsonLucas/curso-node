const express = require('express');

const server = express();
server.use(express.json());

const users = ['Edson', 'Letícia', 'Lola'];

// Query params = ?teste=1
// Route params = /users/1
// Request body = { name: "Edson", email: "contato@edsonlucas.com.br" }

// CRUD básico

// Log da aplicação
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Metódo: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

// Verificar se o name está correto
function checkUserExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'User name is required'});
  }

  return next();
}

// Verificar se o user existe
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  
  if(!user) {
    return res.status(400).json({ error: 'User does not exists'});
  }

  req.user = user;

  return next();
}

// Listando todos usuários
server.get('/users', (req, res) => {
  return res.json(users);
});

// Listando um usuário
server.get('/users/:index', checkUserInArray, (req, res) => {
  //const { index } = req.params;

  //return res.json(users[index]);

  return res.json(req.user);
});

// Criando usuários
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Alterando usuários
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  
  users[index] = name;

  return res.json(users);
});

// Deletando usuários
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);