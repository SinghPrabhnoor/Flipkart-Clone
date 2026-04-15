// Middleware: attaches default user (id=1) to every request
const defaultUser = (req, res, next) => {
  req.userId = 1;
  next();
};

module.exports = defaultUser;
