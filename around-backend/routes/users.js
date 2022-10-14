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

router.post('/signin', login);
router.post('/signup', validateUser, createUser);

router.get('/users/', getUsers);
router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, validateUserName, updateUser);
router.patch('/users/me/avatar', auth, validateAvatar, updateAvatar);
router.get('/users/:_id', validateId, getUserById);

module.exports = router;
