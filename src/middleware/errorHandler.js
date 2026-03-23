const errorHandler = (err, req, res, next) => {
  console.error('SERVER ERROR:', err.message);

  // Invalid JSON in request body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Invalid JSON in body' });
  }

  // Generic error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;