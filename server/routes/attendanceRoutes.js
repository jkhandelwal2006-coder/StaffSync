const express = require('express');
const router = express.Router();
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getTodayStatus,
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/today', getTodayStatus);
router.post('/check-in', checkIn);
router.put('/check-out', checkOut);
router.get('/my', getMyAttendance);
router.get('/all', authorize('HR'), getAllAttendance);

module.exports = router;
