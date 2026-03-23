const validateSensor = (req, res, next) => {
  const { name, type, value } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2)
    errors.push('name must have at least 2 characters');

  if (!['temperature', 'humidity', 'light', 'pressure'].includes(type))
    errors.push('type must be: temperature, humidity, light or pressure');

  if (value !== undefined && isNaN(parseFloat(value)))
    errors.push('value must be a number');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next(); 
};

module.exports = validateSensor;