const User = require("../models/User");

module.exports.register = async (req, res, next) => {
  const { email, password, username, gender } = req.body;
  let user = null;
  try {
    user = new User({ email, password, username, gender });
    await user.save();
    res.status(201).send({
      _id: user._id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      password: user.password,
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
      password: user.password,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  const { id, email, password, username, gender } = req.body;
  try {
    await User.findByIdAndUpdate(id, req.body);

    res.status(201).send({
      _id: id,
      email: email,
      username: username,
      gender: gender,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.remove = async (req, res, next) => {
  const { id } = req.body;
  console.log(req);
  try {
    console.log(id);
    await User.findByIdAndRemove(id);
    res.status(201).send({
      message: "Deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
