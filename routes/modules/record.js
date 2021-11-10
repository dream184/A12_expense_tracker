const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')

router.post('/', (req, res) => {
  const record = req.body
  Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => {
      const category = record.category
      res.render('edit', { record, category })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

router.get('/:category', (req, res) => {
  const category = req.params.category
  Record.find({ category: category })
    .lean()
    .sort({ _id: 'desc' })
    .then(record => {
      const isRecordExist = Boolean(record.length)
      if (!isRecordExist) {
        const totalAmount = 0
        return res.render('index', { totalAmount })
      }
      Record.aggregate([{ $match: { category: category } },
        { $group: { _id: null, amount: { $sum: "$amount" } } }
      ])
        .then(records => {
          const totalAmount = records[0].amount
          res.render('index', { record, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router