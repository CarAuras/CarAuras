const { default: mongoose } = require("mongoose");
const Cars = require("../../../models/users/carSchema");

module.exports.getDashboardStats = async (req, res) => {
  try {
    const dealerId = req.params.id;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const totalCars = await Cars.countDocuments({ dealer_id: dealerId });
    const expiredCars = await Cars.countDocuments({
      dealer_id: dealerId,
      created_at: { $lt: oneMonthAgo },
    });

    const viewsAgg = await Cars.aggregate([
      { $match: { dealer_id: new mongoose.Types.ObjectId(dealerId) } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const totalViews = viewsAgg[0]?.totalViews || 0;

    res.status(200).json({
      totalCars,
      totalViews,
      expiredCars,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
