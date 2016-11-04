const port = (process.env.PORT || 3000)
const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(path.resolve('dist')));

app.get('/', function (req, res, next) {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(port)
console.log('Listening at http://localhost:3000')
