const Cars = require("../../../models/users/carSchema");
const {
  notFoundResponse,
  successResponse,
} = require("../../utils/responseHelpers");

module.exports.getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Cars.findOne({ _id: carId }).populate("dealer_id");
    if (!car) {
      res.send(notFoundResponse);
    }
    res.status(200).json(successResponse(car));
  } catch (error) {
    return error;
  }
};
