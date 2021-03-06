/*
Imports
*/
const jwt = require('jsonwebtoken');

/*
Exports
*/
  module.exports = (req, res, next) => {
    // Get back token in header Authorization
    try {
      const token = req.headers.authorization.split(' ')[1]; //return an array with Barrer in [0] and the token in [1]
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;

      // If there's a userId in the request
      // Whant to know if it's the same as the token
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
};