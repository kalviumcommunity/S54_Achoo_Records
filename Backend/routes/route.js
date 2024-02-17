const express = require('express');

const router = express.Router();

const {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
  readAll
} = require('../handlers/handlers');
const signUpHandler = require('../handlers/signupHandler');

// Signup
router.post('/signup', signUpHandler);

// Create
router.post('/create', createHandler);

// Read all
router.get('/data', readAll);

// Read by ID
router.get('/data/:id', readHandler);

// Update by ID
router.put('/data/:id', updateHandler);

// Delete by ID
router.delete('/data/:id', deleteHandler);

module.exports = router;
