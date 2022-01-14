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

  function generateSalt(params) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(params, (err, salt) => {
        return resolve(salt)
      })
    })
  }
  function generateHash(user, salt) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        return resolve(hash)
      })
    })
  }

  function createUser(user, hash) {
    return new Promise((resolve, reject) => {
      User.create({
        name: user.name,
        email: user.email,
        password: hash
      }, (err, user) => {
        return resolve(user)
      })
    })
  }

  function findCategory(categoryId) {
    return new Promise((resolve, reject) => {
      Category.findOne({ categoryId }, (err, category) => {
        return resolve(category)
      })
    })
  }

  function createRecord(record, user, category) {
    return new Promise((resolve, reject) => {
      Record.create({
        name: record.name,
        categoryId: category._id,
        date: record.date,
        amount: record.amount,
        userId: user._id
      }, (err, record) => {
        return resolve(record)
      })
    })
  }

  async function addSeeds() {
    try {
      await Category.insertMany(categories)
      const salt = await generateSalt(10)
      const hash = await generateHash(SEED_USER, salt)
      const user = await createUser(SEED_USER, hash)
      for (const record of records) {
        const category = await findCategory(record.categoryId)
        await createRecord(record, user, category)
      }
      console.log('added restaurants to db')
      process.exit()
    } catch (err) {
      console.warn(err)
    }
  }
  addSeeds()
})
