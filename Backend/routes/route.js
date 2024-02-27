const express = require('express');

const router = express.Router();

const {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
  readAllHandler,
  signupHandler,
  loginHandler,
  readAllUsers
} = require('../handlers/handlers');

// Read all data
router.get('/data', readAllHandler);

// Read all users
router.get('/users', readAllUsers);

// Read by username
router.get('/data/:username', readHandler);

// Signup
router.post('/signup',signupHandler);

// Login
router.post('/login',loginHandler);

// Create
router.post('/create', createHandler);

// Update by ID
router.put('/edit/:id', updateHandler);

// Delete by ID
router.delete('/delete/:id', deleteHandler);

module.exports = router;
