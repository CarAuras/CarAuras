const Cars = require("../../../models/users/carSchema");

module.exports.getCarByDealerId = async (dealerId) => {
  try {
    const cars = await Cars.find({ dealer_id: dealerId }).populate("dealer_id");

    return cars;
  } catch (error) {
    return error;
  }
};
