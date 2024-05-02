import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../services/userService';

function Register() {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await userService.register(firstName, lastName, email, password);
      history.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Display error message to the user
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {/* Add input fields for firstName, lastName, email, and password */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;