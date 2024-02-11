// routes.js
const express = require('express');

const router = express.Router();

const {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
} = require('../handlers/handlers');

// Create
router.post('/data', createHandler);

// Read

router.get('/data/:id', readHandler);

// Update
router.put('/data/:id', updateHandler);

// Delete
router.delete('/data/:id', deleteHandler);

module.exports = router;
