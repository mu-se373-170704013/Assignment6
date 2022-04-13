const User = require("../models/User");

module.exports.register = async (req, res, next) => {
  const { email, password, username, gender } = req.body;
  let user = null;
  try {
    user = new User({ email, password, username, gender });
    await user.save();
    res.status(201).send({
      id: user._id,
      email: user.email,
      username: user.username,
      gender: user.gender,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username, password: password });
    res.status(200).send({
      _id: user._id,
      email: user.email,
      username: user.username,
      gender: user.gender,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
