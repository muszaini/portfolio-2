/**
 * Lightweight in-memory rate limiting middleware
 */
export function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes default
  const maxRequests = options.maxRequests || 10;
  const message = options.message || 'Too many enquiries submitted from this network. Please wait a few minutes before trying again.';

  const ipStore = new Map();

  // Periodically sweep expired records to prevent memory leak
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      if (now > record.resetTime) {
        ipStore.delete(ip);
      }
    }
  }, Math.max(windowMs, 60000)).unref();

  return (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
                     req.socket.remoteAddress ||
                     'unknown';

    const now = Date.now();
    let record = ipStore.get(clientIp);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs
      };
      ipStore.set(clientIp, record);
      return next();
    }

    record.count += 1;

    if (record.count > maxRequests) {
      const retrySecs = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retrySecs);
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds: retrySecs
      });
    }

    next();
  };
}
