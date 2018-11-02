const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
