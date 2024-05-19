var express = require('express');
var router = express.Router();
const UserDatabase = require('./UserDatabase'); // Assuming UserDatabase contains registerUser logic

/* POST user registration. */
router.post('/users/register', function(req, res, next) {
  const { username, password } = req.body;

  // Assuming registerUser returns true for success, false for failure
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
  } else {
    const userDatabase = new UserDatabase();
    const registrationResult = userDatabase.registerUser(username, password);
    if (registrationResult === true) {
      res.status(200).json({ message: "User registered successfully" });
    } else {
      res.status(409).json({ message: "User already exists" });
    }
  }
});

module.exports = router;
