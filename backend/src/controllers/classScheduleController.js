const classScheduleService = require('../services/classScheduleService');

// Create a new class schedule
exports.createClassSchedule = async (req, res) => {
  try {
    const { course, startTime, endTime, location } = req.body;
    const newClassSchedule = await classScheduleService.createClassSchedule({
      course,
      startTime,
      endTime,
      location,
    });
    res.status(201).json(newClassSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create class schedule' });
  }
};

// Get all class schedules
exports.getAllClassSchedules = async (req, res) => {
  try {
    const classSchedules = await classScheduleService.getAllClassSchedules();
    res.status(200).json(classSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific class schedule by ID
exports.getClassScheduleById = async (req, res) => {
  try {
    const classSchedule = await classScheduleService.getClassScheduleById(req.params.id);
    if (!classSchedule) {
      return res.status(404).json({ error: 'Class schedule not found' });
    }
    res.status(200).json(classSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a class schedule
exports.updateClassSchedule = async (req, res) => {
  try {
    const { course, startTime, endTime, location } = req.body;
    const updatedClassSchedule = await classScheduleService.updateClassSchedule(
      req.params.id,
      {
        course,
        startTime,
        endTime,
        location,
      }
    );
    if (!updatedClassSchedule) {
      return res.status(404).json({ error: 'Class schedule not found' });
    }
    res.status(200).json(updatedClassSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update class schedule' });
  }
};

// Delete a class schedule
exports.deleteClassSchedule = async (req, res) => {
  try {
    const deletedClassSchedule = await classScheduleService.deleteClassSchedule(req.params.id);
    if (!deletedClassSchedule) {
      return res.status(404).json({ error: 'Class schedule not found' });
    }
    res.status(200).json({ message: 'Class schedule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete class schedule' });
  }
};