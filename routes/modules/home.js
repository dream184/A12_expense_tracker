const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
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

module.exports = router