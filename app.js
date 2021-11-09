const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const dayjs = require('dayjs')
const app = express()
const port = 3000
require('./config/mongoose')

const Record = require('./models/record')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: {
    formatDate: function (date) {
      return dayjs(date).format('YYYY//MM/DD')
    }
  }
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.post('/records', (req, res) => {
  console.log(req.body)
})

app.get('/records/new', (req, res) => {
  res.render('new')
})



app.get('/records/edit', (req, res) => {
  res.render('edit')
})

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'desc' })
    .then(record => {
      res.render('index', { record })
    })
    .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
