const User = require("../DBmodel/user");

const signUpHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input (you may want to add more validation)
    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user in the database
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = signUpHandler;
