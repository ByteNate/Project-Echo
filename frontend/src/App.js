import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/class-schedule" component={ClassSchedule} />
          <ProtectedRoute path="/pairing" component={Pairing} />
          <ProtectedRoute path="/substitute" component={Substitute} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;