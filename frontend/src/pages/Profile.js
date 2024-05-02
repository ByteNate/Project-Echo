import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async (updatedUser) => {
    try {
      const userData = await userService.updateProfile(updatedUser);
      setUser(userData);
    } catch (error) {
      console.error('Failed to update user profile:', error);
      // Display error message to the user
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details and update form */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default Profile;