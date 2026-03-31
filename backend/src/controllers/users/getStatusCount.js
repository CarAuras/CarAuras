const Cars = require("../../../models/users/carSchema");
const User = require("../../../models/users/userSchema");

module.exports.getStatusCount = async (req, res) => {
  try {
    const [carsCount, usersCount, brandsCount] = await Promise.all([
      Cars.countDocuments(),
      User.countDocuments(),
      Cars.distinct("brand").countDocuments(),
    ]);

    let respObj = {
      cars: carsCount,
      customers: usersCount,
      brands: brandsCount,
    };
    res.send(respObj);
  } catch (error) {
    return error;
  }
};
