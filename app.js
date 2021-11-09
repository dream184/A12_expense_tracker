const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.get('/records/edit', (req, res) => {
  res.render('edit')
})

app.get('/', (req, res) => {
  res.render('index')
})



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
