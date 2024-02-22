const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');


const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.{7,})'))
    .required(),
});



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    // Hash the password with a salt factor of 10
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Add a static method to validate user input using Joi
userSchema.statics.validateInput = function (userInput) {
  return userValidationSchema.validate(userInput);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
