const fs   = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/sensors.json');

// READ
const getAllSensors = () => {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
};

// READ ONE
const getSensorById = (id) => {
  const sensors = getAllSensors();
  // converting to string because URL params are strings
  return sensors.find(s => String(s.id) === String(id)) || null;
};

// CREATE
const addSensor = (sensor) => {
  const sensors = getAllSensors();
  const newSensor = { id: Date.now(), ...sensor, createdAt: new Date() };
  sensors.push(newSensor);
  fs.writeFileSync(DATA_PATH, JSON.stringify(sensors, null, 2));
  return newSensor;
};

// UPDATE
const updateSensor = (id, data) => {
  const sensors = getAllSensors();
  const index = sensors.findIndex(s => String(s.id) === String(id));

  if (index === -1) return null; // not found

  sensors[index] = { ...sensors[index], ...data }; // merge old + new data
  fs.writeFileSync(DATA_PATH, JSON.stringify(sensors, null, 2));
  return sensors[index];
};

// DELETE
const deleteSensor = (id) => {
  const sensors = getAllSensors();
  const filtered = sensors.filter(s => String(s.id) !== String(id));

  if (filtered.length === sensors.length) return false; // not found

  fs.writeFileSync(DATA_PATH, JSON.stringify(filtered, null, 2));
  return true;
};

module.exports = { getAllSensors, getSensorById, addSensor, updateSensor, deleteSensor };