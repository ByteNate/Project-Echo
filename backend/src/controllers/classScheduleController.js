const ClassSchedule = require('../models/classSchedule');

// Create a new class schedule
exports.createClassSchedule = async (req, res) => {
  try {
    const { course, startTime, endTime, location } = req.body;

    const newClassSchedule = new ClassSchedule({
      course,
      startTime,
      endTime,
      location,
    });

    const savedClassSchedule = await newClassSchedule.save();
    res.status(201).json(savedClassSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all class schedules
exports.getAllClassSchedules = async (req, res) => {
  try {
    const classSchedules = await ClassSchedule.find();
    res.status(200).json(classSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific class schedule by ID
exports.getClassScheduleById = async (req, res) => {
  try {
    const classSchedule = await ClassSchedule.findById(req.params.id);
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

    const updatedClassSchedule = await ClassSchedule.findByIdAndUpdate(
      req.params.id,
      { course, startTime, endTime, location },
      { new: true }
    );

    if (!updatedClassSchedule) {
      return res.status(404).json({ error: 'Class schedule not found' });
    }

    res.status(200).json(updatedClassSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a class schedule
exports.deleteClassSchedule = async (req, res) => {
  try {
    const deletedClassSchedule = await ClassSchedule.findByIdAndDelete(req.params.id);

    if (!deletedClassSchedule) {
      return res.status(404).json({ error: 'Class schedule not found' });
    }

    res.status(200).json({ message: 'Class schedule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};