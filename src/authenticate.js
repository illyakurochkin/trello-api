const firebase = require('./firebase');

const INVALID_AUTHORIZATION_TOKEN_ERROR = 'Invalid Authorization Token';

exports.handler = () => {
  firebase.initialize();

  return async (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token', token);

    if (!token) {
      next();
      return;
    }

    const email = await firebase.verifyToken(token);

    if (!email) {
      res.status(401).send({message: INVALID_AUTHORIZATION_TOKEN_ERROR});
      return;
    }

    Object.assign(req, {locals: {email}});
    next();
  };
};
