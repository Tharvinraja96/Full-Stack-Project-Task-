
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const deleteEmployee = (empId) => {
    fetch(`http://localhost:5000/api/employees/${empId}`, { method: 'DELETE' })
      .then(() => setEmployees((prev) => prev.filter((e) => e.empId !== empId)));
  };

  return (
    <div>
      <h1>Employee List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <Link to={`/details/${emp.empId}`}>Details</Link> |{' '}
                <Link to={`/edit/${emp.empId}`}>Edit</Link> |{' '}
                <button onClick={() => deleteEmployee(emp.empId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
