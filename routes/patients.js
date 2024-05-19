const express = require('express');
const router = express.Router();
const UserDatabase = require('./UserDatabase'); // Import UserDatabase class

// Create an instance of the UserDatabase class
const userDatabase = new UserDatabase();

// Temporary in-memory storage for patient details
const patientDetails = new Map();
let patientId = 1;
// Route to add patient details for a user
router.post('/:username/add', (req, res) => {
  const { username } = req.params;
  const { name, age, gender,diagnosis, treatment } = req.body;

  if (!name || !age || !gender || !diagnosis || !treatment) {
    return res.status(400).json({ message: 'Name, age, gender, diagnosis, and treatment are required' });
  }

  // Authenticate the user before adding patient details
  if (!userDatabase.authenticateUser(username, req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized. Please login first.' });
  }
   patientId += 1;
  // Add patient details to the user's patientDetails array
  if (!patientDetails.has(username)) {
    patientDetails.set(username, []);
  }
  patientDetails.get(username).push({ name, age, gender, diagnosis, treatment });

  res.status(201).json({ message: 'Patient details added successfully' });
});

// Route to retrieve patient details for a user
router.get('/:username/details', (req, res) => {
  const { username } = req.params;

  // Authenticate the user before retrieving patient details
  if (!userDatabase.authenticateUser(username, req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized. Please login first.' });
  }

  // Retrieve patient details for the user
  const detailsMap = patientDetails.get(username) || new Map();
  const details = Array.from(detailsMap.entries()).map(([patientId, patientDetails]) => ({
    patientId,
    ...patientDetails
  }));
  
  // Retrieve user details from the user database
  const user = userDatabase.getUser(username);

  res.status(200).json({ user, patientDetails: details });
});

// Route to update patient details for a user
router.put('/:username/:patientId', (req, res) => {
  const { username, patientId } = req.params;
  const { name, age, gender, diagnosis, treatment } = req.body;

  if (!name || !age || !gender || !diagnosis || !treatment) {
    return res.status(400).json({ message: 'Name, age, gender, diagnosis, and treatment are required' });
  }

  // Authenticate the user before updating patient details
  if (!userDatabase.authenticateUser(username, req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized. Please login first.' });
  }

  // Update patient details for the user
  const details = patientDetails.get(username) || [];
  const updatedDetails = details.map((detail, index) => {
    if (index.toString() === patientId) {
      return { name, age, gender, diagnosis, treatment };
    }
    return detail;
  });
  patientDetails.set(username, updatedDetails);

  res.status(200).json({ message: 'Patient details updated successfully' });
});

// Route to delete patient details for a user
router.delete('/:username/:patientId', (req, res) => {
  const { username, patientId } = req.params;

  // Authenticate the user before deleting patient details
  if (!userDatabase.authenticateUser(username, req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized. Please login first.' });
  }

  // Delete patient details for the user
  const details = patientDetails.get(username) || [];
  const filteredDetails = details.filter((detail, index) => index.toString() !== patientId);
  patientDetails.set(username, filteredDetails);

  res.status(200).json({ message: 'Patient details deleted successfully' });
});

module.exports = router;
