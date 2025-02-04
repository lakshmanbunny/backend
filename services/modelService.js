const Model = require('../models/Model');

exports.getAllModels = async () => {
  return await Model.find();
};

exports.getModelById = async (id) => {
  return await Model.findById(id);
};

exports.createModel = async (modelData) => {
  const model = new Model(modelData);
  await model.save();
  return model;
};
