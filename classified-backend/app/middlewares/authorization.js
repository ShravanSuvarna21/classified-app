const authorization = (permittedUser) => {
  return (req, res, next) => {
    console.log(req.role);
    if (permittedUser.includes(req.role)) {
      next();
    } else {
      return res.status(403).json({ Notice: "Unauthorized Access" });
    }
  };
};

export default authorization;
