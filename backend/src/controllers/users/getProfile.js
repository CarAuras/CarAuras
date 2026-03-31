module.exports.getProfile = async (req, res) => {
  try {
    res.send({ profile: { name: "user profile" } });
  } catch (error) {
    res.send({ error });
  }
};
