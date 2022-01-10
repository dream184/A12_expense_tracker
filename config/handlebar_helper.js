const dayjs = require('dayjs')
const handlebarsHelper = {
  formatDate: function (date) {
    return dayjs(date).format('YYYY/MM/DD')
  },
  formatDate2: function (date) {
    return dayjs(date).format('YYYY-MM-DD')
  },
  isValueEquel: function (a, b) {
    return a.toString() === b.toString()
  }
}
module.exports = handlebarsHelper