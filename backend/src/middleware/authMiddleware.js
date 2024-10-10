const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Failed to authenticate token' });

    req.user = decoded; 
    next();
  });
};

module.exports = authenticate;
