const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const dayjs = require('dayjs')
const session = require('express-session')
const app = express()
const port = 3000
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
    formatDate: function (date) {
      return dayjs(date).format('YYYY/MM/DD')
    },
    formatDate2: function (date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    isCategorySelected: function (selectedcategory, category) {
      return (selectedcategory === category)
    }
  }
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'codingeveryday',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
