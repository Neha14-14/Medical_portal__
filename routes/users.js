var express = require('express');
var router = express.Router();
const UserDatabase = require('./UserDatabase');

/* GET users listing. */
const userDatabase = new UserDatabase();
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

app.post('/users/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if username, password, and confirmPassword are provided
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Username, password, and confirmation password are required' });
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password and confirmation password do not match' });
  }

  // Check if user already exists
  if (userDatabase.getUser(username)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Register the user
  userDatabase.registerUser(username, password);

  // Send success response
  res.status(201).json({ message: 'User registered successfully' });
});
router.post('/login',(req,res)=>{
     const {username,password} = req.body;
     if(!username || !password){
       return res.status(400).json({message : '******Username and password are required'});
     }
     console.log(`User ${username} **********`); 
     if(!userDatabase.authenticateUser(username,password)){
      return res.status(400).json({message: 'Invalid username or password'});
     }
     console.log(`User ${username} logged in successfully`);
     res.status(200).json({message : 'You have been Logged in sucessfully'});
});

module.exports = router;
