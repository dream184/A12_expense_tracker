const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const records = require('./recordsData.json')
const categories = require('./categoriesData.json')

const SEED_USER = {
  name: 'example',
  email: 'example@example',
  password: '12345678'
}

db.once('open', () => {
  console.log('mongodb connected!')
  Category.insertMany(categories)
    .then(() => {
      bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => {
        return User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        })
      })
      .then((user) => {   
        for (let i = 0; i < records.length; i++) {
          const categoryId = records[i].categoryId
          var userId = user._id
          Category.findOne({ categoryId })
            .lean()
            .then((category) => {
              Record.create({
                name: records[i].name,
                categoryId: category._id,
                date: records[i].date,
                amount: records[i].amount,
                userId: userId
              })   
            })
            .catch(err => console.log(err))
        }      
      })
      .catch(err => console.log(err))
    })
  console.log('added restaurants to db')
})
