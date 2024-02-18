const mongoose = require('mongoose');
const AchooModel = require('../DBmodel/entities');
const User = require('../DBmodel/user');

// handlers.js
const createHandler = async (req, res) => {
  const data = req.body;
  const { video_link, image_link, description } = data;
  console.log(data);

  try {
    // Validate input data
    if (!video_link || !image_link || !description) {
      throw new Error('Please provide valid data');
    }

    // Check if the data already exists
    const existingData = await AchooModel.findOne({ video_link: video_link });
    if (existingData) {
      throw new Error('Data with the same video link already exists');
    }

    // Create a new instance of the AchooModel
    const newData = new AchooModel({
      video_link: video_link,
      image_link: image_link,
      description: description,
    });

    // Save the new data to the database
    const result = await newData.save();

    console.log('Data added successfully:', result);

    // Send success response to the front end
    res.json({ success: true, message: 'Data added successfully' });

  } catch (error) {
    console.error('Error adding data to database:', error);

    // Send error response to the front end
    res.status(500).json({ success: false, message: 'Failed to add data to the database' });
  }
};

const readAllHandler = async (req, res) => {
  try {
    // Retrieve all data from the database
    const datas = await AchooModel.find();
    res.send(datas);
  } catch (error) {
    console.error('Error reading data from the database:', error);
    res.status(500).json({ error: 'Failed to retrieve data from the database' });
  }
};

const readHandler = async (req, res) => {
  try {
    const id = req.params.id;
    // Retrieve a record by ID from the database
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

    // Validate input data
    const { video_link, image_link, description } = req.body;

    if (!video_link || !image_link || !description) {
      throw new Error('Please provide valid data for update');
    }

    // Update a record by ID in the database
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
    
    // Delete a record by ID from the database
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

const signupHandler =  async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      password, 
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// backend route for handling login (e.g., loginHandler.js)
const loginHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the provided password matches the stored hash
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Authentication successful
    res.status(200).json({ message: 'Login successful' });
    
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
