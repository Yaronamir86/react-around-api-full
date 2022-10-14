const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const { validateUser } = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUserName,
  validateAvatar,
  validateId,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:_id', validateId, getUserById);
router.patch('/me', auth, validateUserName, updateUser);
router.patch('/me/avatar', auth, validateAvatar, updateAvatar);

router.post('/signin', login);
router.post('/signup', validateUser, createUser);

module.exports = router;
