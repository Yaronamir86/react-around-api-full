const jwt = require('jsonwebtoken');
const Unauthoraized = require('../errors/Unauthorized');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthoraized('Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthoraized('Authorization Required');
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};

module.exports = auth;
