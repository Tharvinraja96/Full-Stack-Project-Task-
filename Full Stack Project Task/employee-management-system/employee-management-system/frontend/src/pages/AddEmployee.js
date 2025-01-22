
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [form, setForm] = useState({ empId: '', name: '', position: '', salary: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => navigate('/'));
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <input name="empId" placeholder="Emp ID" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="position" placeholder="Position" onChange={handleChange} required />
        <input name="salary" placeholder="Salary" type="number" onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddEmployee;
