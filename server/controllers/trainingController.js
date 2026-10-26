const Training = require('../models/Training');

// @desc    Create training program
// @route   POST /api/trainings
// @access  Private (Manager)
const createTraining = async (req, res) => {
  try {
    const { title, description, date, trainer, assignedTo } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Title, description and date are required' });
    }

    const training = await Training.create({
      title,
      description,
      date,
      trainer: trainer || 'TBD',
      createdBy: req.user._id,
      assignedTo: assignedTo || [],
    });

    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all training programs
// @route   GET /api/trainings
// @access  Private
const getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find()
      .populate('createdBy', 'name')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update training program
// @route   PUT /api/trainings/:id
// @access  Private (Manager)
const updateTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    const updated = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete training program
// @route   DELETE /api/trainings/:id
// @access  Private (Manager)
const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    await Training.findByIdAndDelete(req.params.id);
    res.json({ message: 'Training deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTraining, getTrainings, updateTraining, deleteTraining };
