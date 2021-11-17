const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('這個 Email 已經註冊過了。')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

module.exports = router