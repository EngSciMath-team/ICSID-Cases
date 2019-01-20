const express = require('express')
const parser = require('body-parser')
const app = express()
const port = 3000

// Middleware:
app.use(parser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('The API is running')
})

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
