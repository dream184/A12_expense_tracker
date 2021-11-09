const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const dayjs = require('dayjs')
const app = express()
const port = 3000
require('./config/mongoose')

const Record = require('./models/record')

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: 'hbs',
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

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.post('/records', (req, res) => {
  const record = req.body
  Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  
  Record.findById(id)
    .lean()
    .then((record) => {
      const category = record.category
      res.render('edit', { record, category })
    })
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  Record.findById(id)
    .then(record => {
      console.log(record.name)
      console.log(req.body)
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
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
      const isRecordExist = Boolean(record.length)
      if (!isRecordExist) {
        return res.render('index')
      }
      Record.aggregate([{ $group: { _id: null, amount: { $sum: "$amount" } } }])
        .then(records => {
          const totalAmount = records[0].amount
          res.render('index', { record, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
