const Cars = require("../../../models/users/carSchema");

module.exports.addViewsCount = async (req, res) => {
  try {
    const car = await Cars.findOne({ _id: req.params.id });
    if (!car) {
      res.status(404).send({ message: "Car not founc" });
    }
    let carViewersCount = car.views ?? 0;
    const newCount = (carViewersCount += 1);
    let updatedCar = await Cars.updateOne(
      { _id: req.params.id },
      { $set: { views: newCount } }
    );
    res.status(200).send(car);
  } catch (error) {
    return error;
  }
};
