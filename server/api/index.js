const router = require('express').Router()

router.use('/twitter', require('./twitter').router)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router