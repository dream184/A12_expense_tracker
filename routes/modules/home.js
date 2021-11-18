const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  const CATEGORY = {
    家居物業: "https://fontawesome.com/icons/home?style=solid",
    交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
    休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
    餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
    其他: "https://fontawesome.com/icons/pen?style=solid"
  }
  const userId = res.locals.user._id
  Record.find({userId: userId})
    .lean()
    .sort({ _id: 'desc' })
    .then(record => {
      const isRecordExist = Boolean(record.length)
      if (!isRecordExist) {
        return res.render('index')
      }
      Record.aggregate([{ $group: { _id: null, amount: { $sum: '$amount' } } }])
        .then(records => {
          const totalAmount = records[0].amount
          res.render('index', { record, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
