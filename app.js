const express = require('express');
const cors = require('cors');
const path = require('path');  // Import the path module

const app = express();

const corsOptions = {
  origin: 'http://localhost:3004',  // Your frontend's address
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});
// Endpoint for user registration
app.post('/users/register', (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // Mock registration logic (replace with actual logic)
  // For demonstration purposes, just send a success message
  res.status(200).json({ message: 'User registered successfully' });
});

// Start the server
app.listen(3007, () => {
  console.log('Server is running on port 3000');
});
