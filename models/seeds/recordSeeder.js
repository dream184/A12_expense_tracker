const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
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

const categories = [
  {
    categoryId: 1,
    name: '家居物業'
  },
  {
    categoryId: 2,
    name: '交通出行'
  },
  {
    categoryId: 3,
    name: '休閒娛樂'
  },
  {
    categoryId: 4,
    name: '餐飲食品'
  },
  {
    categoryId: 5,
    name: '其他'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  Record.insertMany(records)
    .then(() => {
      Category.insertMany(categories)
        .then(() => {
          return db.close()
        })
        .catch(error => console.log(error))
    })
  console.log('added restaurants to db')
})
