const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.post('/', (req, res) => {
  const record = req.body
  console.log(req.body)
  const userId = res.locals.user._id
  record['userId'] = userId
  console.log(record)
  Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = res.locals.user._id
  Record.findOne({ _id: id, userId})
    .lean()
    .populate('categoryId')
    .then((record) => {
      Category.find()
        .lean()
        .then((categories) => {
          categories.forEach(category => {
            if (category.categoryId === record.categoryId.categoryId) {
              category.isSelected = true
            }
          })
          console.log(record)
          res.render('edit', { record, categories })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const userId = res.locals.user._id
  const { name, date, categoryId, amount } = req.body
  Record.findOne({ id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = res.locals.user._id
  Record.findOne({ id, userId })
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((allCategories) => {
      res.render('new', { allCategories })
    })
    .catch(error => console.log(error))
})

router.get('/:category', (req, res) => {
  const type = req.params.category
  const categoryNumber = {
    'home-related': 1,
    'transportation': 2,
    'entertainment': 3,
    'food': 4,
    'other': 5
  }
  Category.findOne({ categoryId: categoryNumber[type] })
    .lean()
    .then(category => {
      const categoryId = category._id
      const userId = res.locals.user._id
      Record.find({ userId, categoryId })
        .lean()
        .sort({ _id: 'desc' })
        .then(record => {
          const isRecordExist = Boolean(record.length)
          if (!isRecordExist) {
            const totalAmount = 0
            return res.render('index', { totalAmount })
          }
          Record.aggregate([{ $match: { categoryId: categoryId } },
            { $group: { _id: null, amount: { $sum: '$amount' } } }
          ])
            .then(records => {
              const totalAmount = records[0].amount
              res.render('index', { record, totalAmount })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }) 
})

module.exports = router
