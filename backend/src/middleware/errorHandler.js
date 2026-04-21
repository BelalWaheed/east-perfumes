/**
 * Central async error catcher — wrap route handlers with this
 * so you never need try/catch in every route.
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Global error handler — must be registered LAST in Express.
 */
export function errorHandler(err, req, res, _next) {
  console.error(err);

  // Mongoose duplicate key (e.g. email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} already exists` });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.status(err.status || 500).json({ message: err.message || 'Server error' });
}
