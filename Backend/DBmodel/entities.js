const mongoose = require("mongoose");
const Joi = require("joi");

// Define Joi schema for validation
const achooSchema = Joi.object({
  video_link: Joi.string().required(),
  image_link: Joi.string().required(),
  description: Joi.string().required(),
});

// Define Mongoose schema for MongoDB
const achooDataSchema = new mongoose.Schema({
  video_link: {
    type: String,
    required: true,
    unique: true,
  },
  image_link: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
});

const AchooModel = mongoose.model("achoo_entities", achooDataSchema);

// Function to validate input using Joi
const validateAchooInput = (inputData) => {
  return achooSchema.validate(inputData);
};

module.exports = {
  AchooModel,
  validateAchooInput,
};
