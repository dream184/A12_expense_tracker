module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    console.log('warning_msg', '請先登入才能使用!')
    res.redirect('/users/login')
  }
}