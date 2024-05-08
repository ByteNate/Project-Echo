import React, { useState } from 'react';
import substituteService from '../services/substituteService';

function Substitute() {
  const [availability, setAvailability] = useState('');
  const [substituteInfo, setSubstituteInfo] = useState(null);

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await substituteService.updateAvailability(availability);
      setSubstituteInfo(data);
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  };

  return (
    <div>
      <h2>Substitute Management</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Availability:
          <input type="text" value={availability} onChange={handleAvailabilityChange} />
        </label>
        <button type="submit">Update Availability</button>
      </form>
      {substituteInfo && (
        <div>
          <h3>Substitute Information</h3>
          <p>
            <strong>Name:</strong> {substituteInfo.ta.firstName} {substituteInfo.ta.lastName}
            <br />
            <strong>Class:</strong> {substituteInfo.classSchedule.course}
            <br />
            <strong>Date:</strong> {substituteInfo.date}
          </p>
        </div>
      )}
    </div>
  );
}

export default Substitute;