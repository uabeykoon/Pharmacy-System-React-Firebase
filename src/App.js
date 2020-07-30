import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn/SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './PharmacyOwners/Home';
import Customers from './Customers/Customers';
import DataInput from './Direct Data Input/DataInput';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/datainput" component={DataInput} />
          <Route path="/adminhome" component={Home} />
          <Route path="/customer" component={Customers } />
          <Route path="/" component={SignIn} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
