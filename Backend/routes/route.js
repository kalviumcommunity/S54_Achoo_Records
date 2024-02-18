const express = require('express');

const router = express.Router();

const {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
  readAllHandler,
  signupHandler,
  loginHandler
} = require('../handlers/handlers');

// Signup
router.post('/signup',signupHandler);

// Login
router.post('/login',loginHandler);

// Create
router.post('/create', createHandler);

// Read all
router.get('/data', readAllHandler);

// Read by ID
router.get('/data/:id', readHandler);

// Update by ID
router.put('/edit/:id', updateHandler);

// Delete by ID
router.delete('/delete/:id', deleteHandler);

module.exports = router;
