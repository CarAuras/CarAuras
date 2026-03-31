const Cars = require("../../../models/users/carSchema");

module.exports.searchCar = async (req, res) => {
  try {
    const searchKey = req.query.key;
    const matchedCars = await Cars.find({
      $or: [
        { name: { $regex: searchKey, $options: "i" } },
        { car_name: { $regex: searchKey, $options: "i" } },
        { brand: { $regex: searchKey, $options: "i" } },
        { model: { $regex: searchKey, $options: "i" } },
        { fuel_type: { $regex: searchKey, $options: "i" } },
        { transmission: { $regex: searchKey, $options: "i" } },
        { body_type: { $regex: searchKey, $options: "i" } },
        { condition: { $regex: searchKey, $options: "i" } },
        { place: { $regex: searchKey, $options: "i" } },
      ],
    });

    res.status(200).json({ success: true, data: matchedCars });
  } catch (error) {
    return error;
  }
};
