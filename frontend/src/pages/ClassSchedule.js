import React, { useState, useEffect } from 'react';
import classScheduleService from '../services/classScheduleService';

function ClassSchedule() {
  const [classSchedules, setClassSchedules] = useState([]);

  useEffect(() => {
    const fetchClassSchedules = async () => {
      try {
        const data = await classScheduleService.getAllClassSchedules();
        setClassSchedules(data);
      } catch (error) {
        console.error('Failed to fetch class schedules:', error);
      }
    };

    fetchClassSchedules();
  }, []);

  return (
    <div>
      <h2>Class Schedules</h2>
      {classSchedules.length === 0 ? (
        <p>No class schedules available.</p>
      ) : (
        <ul>
          {classSchedules.map((schedule) => (
            <li key={schedule._id}>
              <strong>{schedule.course}</strong>
              <br />
              Time: {schedule.startTime} - {schedule.endTime}
              <br />
              Location: {schedule.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClassSchedule;