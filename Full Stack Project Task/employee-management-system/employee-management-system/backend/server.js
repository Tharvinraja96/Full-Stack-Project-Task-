
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/employees/:empId', async (req, res) => {
  try {
    const employee = await Employee.findOne({ empId: req.params.empId });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.send(employee);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/employees/:empId', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { empId: req.params.empId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/employees/:empId', async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ empId: req.params.empId });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.send(employee);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
