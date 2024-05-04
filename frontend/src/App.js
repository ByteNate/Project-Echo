import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ClassSchedule from './pages/ClassSchedule';
import Pairing from './pages/Pairing';
import Substitute from './pages/Substitute';

import { config } from '../config/frontend';
console.log(config.appName);
console.log(config.routeSettings.login);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class-schedule"
            element={
              <ProtectedRoute>
                <ClassSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pairing"
            element={
              <ProtectedRoute>
                <Pairing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/substitute"
            element={
              <ProtectedRoute>
                <Substitute />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;