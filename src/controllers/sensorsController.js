const {getAllSensors, getSensorById, addSensor, updateSensor, deleteSensor} = require("../services/sensorService");

const sensor = require("../models/sensor");

const getAll = async (req, res, next) => {
  try {
    const sensors = await sensor.findAll({ 
      where: {userId: req.user.id}
    });
    res.status(200).json({ success: true, data: sensors, count: sensors.length });
  } catch (err) {
    next(err); 
  }
};

const getById =  async (req, res, next) => {
  try {
    const sensor = await sensor.findOne({
      where: {id: req.params.id, userId: req.user.id}
    });

    if (!sensor) {
      return res.status(404).json({ success: false, error: 'Sensor not found' });
    }

    res.status(200).json({ success: true, data: sensor });
  } catch (err) {
    next(err);
  }
};



const create = async (req, res, next) => {
  try {
    const { name, type, value, unit } = req.body;

    if (!name || !type) {
      return res.status(400).json({ success: false, error: 'name and type are required' });
    }

    const sensor =await sensor.create({
      name, type, value, unit,
      userId: req.user.id
    });
    res.status(201).json({ success: true, data: sensor });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const sensor = await Sensor.findOne({
      where: {id: req.params.id, userId: req.user.id}
    });

    if (!sensor) {
      return res.status(404).json({ success: false, error: 'Sensor not found' });
    }

    await sensor.update(req.body);
    res.status(200).json({ success: true, data: sensor });
  } catch (err) {
    next(err);
  }
};


const remove = async (req, res, next) => {
  try {
    const sensor = await Sensor.findOne({
      where: { id: req.params.id,  userId: req.user.id}
    });

    if (!sensor) {
      return res.status(404).json({ success: false, error: 'Sensor not found' });
    }

    await sensor.destroy();

    res.status(200).json({ success: true, message: 'Sensor deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {getAll, getById, create, update, remove};