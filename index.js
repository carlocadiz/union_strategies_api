const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const knex = require('knex');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'carlomagno',
    password : '',
    database : 'union'
  }
});

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());


app.post('/signin', (req, res) => {
  db.select('*').from('users')
    .where({
      email: req.body.email,
      password: req.body.password
    })
    .then(data => {
      if (data.length) {
        res.json('success')
      }
    })
})

app.listen(PORT, () => {
  console.log(`server is listening on PORT` + PORT);
});

module.exports = app;
