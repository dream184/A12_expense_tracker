const db = require('../../config/mongoose')
const Record = require('../record')

const records = [
  {
    name: '早餐',
    category: 'food',
    date: '2021-11-9',
    amount: '80'
  },
  {
    name: '遊戲片',
    category: 'entertainment',
    date: '2021-11-9',
    amount: '815'
  },
  {
    name: '肥皂',
    category: 'home-related',
    date: '2021-11-9',
    amount: '200'
  },
  {
    name: '補習費',
    category: 'other',
    date: '2021-11-9',
    amount: '5600'
  },
  {
    name: '交通費',
    category: 'transportation',
    date: '2021-11-9',
    amount: ' 60'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  Record.insertMany(records)
    .then(() => {
      return db.close()
    })
  console.log('added restaurants to db')
})
