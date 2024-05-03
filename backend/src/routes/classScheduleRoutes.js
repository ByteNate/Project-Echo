const express = require('express');
const router = express.Router();
const classScheduleController = require('../controllers/classScheduleController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all class schedules
router.get('/', authMiddleware, classScheduleController.getAllClassSchedules);

// Get a specific class schedule
router.get('/:id', authMiddleware, classScheduleController.getClassScheduleById);

// Create a new class schedule
router.post('/', authMiddleware, classScheduleController.createClassSchedule);

// Update a class schedule
router.put('/:id', authMiddleware, classScheduleController.updateClassSchedule);

// Delete a class schedule
router.delete('/:id', authMiddleware, classScheduleController.deleteClassSchedule);

module.exports = router;