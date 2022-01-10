const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

router.get('/', (req, res) => {
  const userId = res.locals.user._id
  Record.find({userId: userId})
    .lean()
    .populate('categoryId')
    .sort({ _id: 'desc' })
    .then(record => {
      Category.find()
        .lean()
        .then((categories) => {
          console.log(categories)
          const isRecordExist = Boolean(record.length)
          let totalAmount = 0
          if (!isRecordExist) {
            const totalAmount = 0
            return res.render('index', { totalAmount, categories })
          }
          Record.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: userId, amount: { $sum: '$amount' } } }
          ])
            .then((result) => {
              const totalAmount = result[0].amount
              return res.render('index', { record, totalAmount, categories })
            }) 
        })
    })
    .catch(error => console.log(error))
})

module.exports = router
