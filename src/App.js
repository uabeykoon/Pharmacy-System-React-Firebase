import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import SignIn from './SignIn/SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './PharmacyOwners/Home';
import Customers from './Customers/Customers';
import DataInput from './Direct Data Input/DataInput';
import CustomerRegistration from './Customers/Registration/CustomerRegistration';
import PharmacyRegistration from './PharmacyOwners/Registration/PharmacyRegistration';
import Dashboard from './Dashboard/Dashboard';
import AreaChart from './Charts/Area Chart';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/datainput" component={DataInput} />
          <Route path="/adminhome" component={Home} />
          <Route path="/customer" component={Customers } />
          <Route path="/customerregistration" component={CustomerRegistration } />
          <Route path="/pharmacyregistration" component={PharmacyRegistration } />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/chart" component={AreaChart} />
          <Route path="/" component={SignIn} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
