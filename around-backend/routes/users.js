const router = require('express').Router();

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
router.get('/me', getCurrentUser);
router.get('/:_id', validateId, getUserById);
router.patch('/me', validateUserName, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);
