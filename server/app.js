const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 4000;
const fs = require('fs');

app.use(session({
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 //쿠기 유효시간 1시간
  }
}));

app.use(express.json({
  limit: '50mb'
}))

const server = app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
  console.log(`Server Restart`);
  delete require.cache[require.resolve('./sql.js')];
  sql = require('./sql.js');
});

const db =  {
  database: 'onTheGaint',
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'resister-boy'
};

const dbPool = require('mysql').createPool(db);

app.post('/api/login', async (request, response) => {
  request.session['email'] = 'hassanpumped17@gmail.com';
  response.send('ok')
});

app.post('/api/logout', async (request, response) => {
  request.session.destroy();
  response.send('ok')
});


app.post('/api/:alias', async (request, response) => {
  // if(!request.session.email) {
  //   return response.status(401).send({error: `Not assigned`})
  // }
  try { 
    response.send(await req.db(request.params.alias, request.body.param))
  } catch(err) {
    response.status(500).send({
      error: err 
    });
  }
});

const req = {
  async db(alias, param = [], where = '') {
    return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
      if (error) {
        if (error.code != 'ER_DUP_ENTRY')
          console.log(error);
        resolve({
          error
        });
      } else resolve(rows);
    }));
  }
};