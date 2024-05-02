import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ClassSchedule from './pages/ClassSchedule';
import Pairing from './pages/Pairing';
import Substitute from './pages/Substitute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/class-schedule" component={ClassSchedule} />
        <Route path="/pairing" component={Pairing} />
        <Route path="/substitute" component={Substitute} />
      </Switch>
    </div>
  );
}

export default App;