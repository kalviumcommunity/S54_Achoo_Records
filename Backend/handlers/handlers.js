const mongoose = require('mongoose');
const AchooModel = require('../DBmodel/entities');

// handlers.js
const createHandler = (req, res) => {
  // Logic to create a new resource
  res.json({ message: "Records created successfully" });
};

const readAll = async (req,res) =>{
  try {
    let datas
    await AchooModel.find().then((data)=>{
      datas = data
    })
    res.send(datas);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }

}

const readHandler = (req, res) => {
  const id = req.params.id
  // Logic to read Records
    res.json({ message: `Read Records with ID ${ req.params.id}` });
};

const updateHandler = (req, res) => {
  // Logic to update a Records
  res.json({
    message: `Records with ID ${req.params.id} updated successfully`,
  });
};

const deleteHandler = (req, res) => {
  // Logic to delete a Records
  res.json({
    message: `Records with ID ${req.params.id} deleted successfully`,
  });
};

module.exports = {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
  readAll
};
