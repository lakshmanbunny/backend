// backend/routes/modelRoutes.js
const express = require('express');
const router = express.Router();
const Model = require('../models/Model');

// Fetch all models
router.get('/', async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
