
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeDetails from './pages/EmployeeDetails';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add Employee</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:empId" element={<EditEmployee />} />
          <Route path="/details/:empId" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
