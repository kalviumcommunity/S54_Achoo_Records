// routes.js
const express = require('express');

const router = express.Router();

const {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
  readAll
} = require('../handlers/handlers');

// Create
router.post('/data', createHandler);

// Read

// router.get('/data', readAll);

router.get('/data', readAll); 


router.get('/data/:id', readHandler);

// Update
router.put('/data/:id', updateHandler);

// Delete
router.delete('/data/:id', deleteHandler);

module.exports = router;
