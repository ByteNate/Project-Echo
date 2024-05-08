import React, { useState, useEffect } from 'react';
import pairingService from '../services/pairingService';

function Pairing() {
  const [pairings, setPairings] = useState([]);

  useEffect(() => {
    const fetchPairings = async () => {
      try {
        const data = await pairingService.getAllPairings();
        setPairings(data);
      } catch (error) {
        console.error('Failed to fetch pairings:', error);
      }
    };

    fetchPairings();
  }, []);

  return (
    <div>
      <h2>TA-Student Pairings</h2>
      {pairings.length === 0 ? (
        <p>No pairings available.</p>
      ) : (
        <ul>
          {pairings.map((pairing) => (
            <li key={pairing._id}>
              <strong>Class:</strong> {pairing.classSchedule.course}
              <br />
              <strong>TA:</strong> {pairing.ta.firstName} {pairing.ta.lastName}
              <br />
              <strong>Student:</strong> {pairing.student.firstName} {pairing.student.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Pairing;