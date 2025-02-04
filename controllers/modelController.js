const Model = require('../models/Model');

exports.getModels = async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ msg: 'Model not found' });
    }
    res.json(model);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createModel = async (req, res) => {
  const { name, description, fileURL, category } = req.body;
  try {
    const model = new Model({ name, description, fileURL, category });
    await model.save();
    res.status(201).json(model);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
