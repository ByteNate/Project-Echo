// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ error: errors });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Authentication required' });
    }
  
    res.status(500).json({ error: 'Internal server error' });
  };