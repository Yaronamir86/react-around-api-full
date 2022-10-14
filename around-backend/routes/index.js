const router = require('express').Router();

const nonRoute = require('./nonExist');

router.use('*', nonRoute);

module.exports = router;
