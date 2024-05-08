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

import { config } from './config/frontend';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path={config.routeSettings.home} element={<Home />} />
          <Route path={config.routeSettings.login} element={<Login />} />
          <Route path={config.routeSettings.register} element={<Register />} />
          <Route
            path={config.routeSettings.profile}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={config.routeSettings.classSchedule}
            element={
              <ProtectedRoute>
                <ClassSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path={config.routeSettings.pairing}
            element={
              <ProtectedRoute>
                <Pairing />
              </ProtectedRoute>
            }
          />
          <Route
            path={config.routeSettings.substitute}
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