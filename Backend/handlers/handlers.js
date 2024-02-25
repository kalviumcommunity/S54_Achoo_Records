const mongoose = require('mongoose');
const {AchooModel} = require('../DBmodel/entities');
const User = require('../DBmodel/user');
const jwt = require('jsonwebtoken');

// handlers.js
const createHandler = async (req, res) => {
  const data = req.body;
  const { video_link, image_link, description } = data;
  console.log(data);

  try {

    if (!video_link || !image_link || !description) {
      throw new Error('Please provide valid data');
    }


    const existingData = await AchooModel.findOne({ video_link: video_link });
    if (existingData) {
      throw new Error('Data with the same video link already exists');
    }

    const newData = new AchooModel({
      video_link: video_link,
      image_link: image_link,
      description: description,
    });

    
    const result = await newData.save();

    console.log('Data added successfully:', result);


    res.json({ success: true, message: 'Data added successfully' });

  } catch (error) {
    console.error('Error adding data to database:', error);


    res.status(500).json({ success: false, message: 'Failed to add data to the database' });
  }
};

const readAllHandler = async (req, res) => {
  try {
    const datas = await AchooModel.find();
    res.json(datas);
  } catch (error) {
    console.error('Error reading data from the database:', error);
    res.status(500).json({ error: 'Failed to retrieve data from the database' });
  }
};


const readHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await AchooModel.findById(id);
    if (!record) {
      throw new Error('Record not found');
    }

    res.json({ record });
  } catch (error) {
    console.error('Error reading a record from the database:', error);
    res.status(500).json({ error: 'Failed to retrieve the record from the database' });
  }
};

const updateHandler = async (req, res) => {
  try {
    const id = req.params.id;


    const { video_link, image_link, description } = req.body;

    if (!video_link || !image_link || !description) {
      throw new Error('Please provide valid data for update');
    }


    const updatedRecord = await AchooModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRecord) {
      throw new Error('Record not found for update');
    }

    res.json({ updatedRecord });
  } catch (error) {
    console.error('Error updating a record in the database:', error);
    res.status(500).json({ error: 'Failed to update the record in the database' });
  }
};


const deleteHandler = async (req, res) => {
  try {
    const id = req.params.id;
    

    const deletedRecord = await AchooModel.findByIdAndDelete(id);
    if (!deletedRecord) {
      throw new Error('Record not found for delete');
    }
    res.json({ message: 'Record deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting a record from the database:', error);
    res.status(500).json({ error: 'Failed to delete the record from the database' });
  }
};

const signupHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ message: 'Username already exists' });
    }
    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const loginHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // User authenticated, generate and send a token
    const token = jwt.sign({ userId: user._id }, 'sak2304', { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', token });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
  readAllHandler,
  signupHandler,
  loginHandler,
};
