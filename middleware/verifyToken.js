const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({
      status: false,
      message: "Unauthorized",
      data: null,
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.send({
      status: false,
      message: "Invalid Token",
      data: null,
    });
  }
};
