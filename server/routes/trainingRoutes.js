const express = require('express');
const router = express.Router();
const {
  createTraining,
  getTrainings,
  updateTraining,
  deleteTraining,
} = require('../controllers/trainingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getTrainings);
router.post('/', authorize('Manager'), createTraining);
router.put('/:id', authorize('Manager'), updateTraining);
router.delete('/:id', authorize('Manager'), deleteTraining);

module.exports = router;
