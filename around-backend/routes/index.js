const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const nonRoute = require('./nonExist');

const { createUser, login } = require('../controllers/users');

const { validateUser } = require('../middlewares/validation');

router.post('/signin', login);
router.post('/signup', validateUser, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', nonRoute);

module.exports = router;
