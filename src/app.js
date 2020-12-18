const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {Board} = require('./models');
const {handler} = require('./authenticate');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  res.send({
    status: 'success',
    message: 'hello world',
  })
});

app.use(handler());

app.get('/boards', async (req, res) => {
  const email = req && req.locals && req.locals.email;

  if(!email) {
    res.sendStatus(403);
    return;
  }

  const boards = await Board.find({members: {$all: [email]}});
  console.log('boards', boards);
  res.send(boards);
});

app.post('/boards', async (req, res) => {
  const email = req && req.locals && req.locals.email;

  if(!email) {
    res.sendStatus(403);
    return;
  }

  const boards = await Board.create({
    name: req.body.name,
    members: [email],
    columns: [],
  });

  res.send(boards);
});

app.post('/boards/:id', async (req, res) => {
  const boardId = req && req.params && req.params.id
  console.log('post', boardId);
  await Board.findByIdAndUpdate(boardId, req.body);
  res.sendStatus(200);
});

app.get('/create', async (req, res) => {
  await Board.create({
    name: 'First board',
    members: ['illya.kurochkin@gmail.com'],
    columns: [
      {
        id: 'lane1',
        title: 'To do',
        cards: [
          {
            id: 'Card1',
            title: 'Write Blog',
            description: 'First card description',
            members: ['illya.kurochkin@gmail.com'],
          },
          {
            id: 'Card2',
            title: 'Pay Rent',
            description: 'Transfer via NEFT',
          },
        ],
      },
      {
        id: 'lane2',
        title: 'Completed',
        cards: [],
      },
    ],
  })
});

module.exports = app;

