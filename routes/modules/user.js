const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: false
}))

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
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err)) )      
      }
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  console.log('您已經成功登出!')
  res.redirect('/users/login')
})

module.exports = router