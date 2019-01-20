const express = require('express')
const parser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const port = 3000

// Middleware:
app.use(parser.urlencoded({ extended: true }))

const db = new sqlite3.Database(
  './database.db',
  sqlite3.OPEN_READWRITE,
  err => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to database.db.')
  },
)

app.get('/', (req, res) => {
  db.serialize(async () => {
    try {
      const rows = []
      await db.each(`SELECT * from cases LIMIT 2`, (err, row) => {
        if (err) {
          return res.send(err.message)
        }
        console.log('PUSHING', row)
        rows.push(row)
      })
      await res.send(JSON.stringify(rows))
    } catch (e) {
      res.send(JSON.stringify(e))
    }
  })
})

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
