const { default: mongoose } = require("mongoose");
const Cars = require("../../../models/users/carSchema");

module.exports.getDashboardGraphStats = async (req, res) => {
  try {
    const dealerId = req.params.id;
    const period = req.query.period;

    let groupFormat,
      dateFrom,
      count = 0;

    const now = new Date();

    if (period === "week") {
      groupFormat = { $dayOfWeek: "$created_at" };
      dateFrom = new Date();
      dateFrom.setDate(now.getDate() - 6);
      count = 7;
    } else if (period === "month") {
      groupFormat = { $dayOfMonth: "$created_at" };
      dateFrom = new Date();
      dateFrom.setDate(now.getDate() - 29);
      count = 30;
    } else if (period === "year") {
      groupFormat = { $month: "$created_at" };
      dateFrom = new Date();
      dateFrom.setFullYear(now.getFullYear() - 1);
      count = 12;
    } else {
      return res.status(400).json({ error: "Invalid period" });
    }

    const result = await Cars.aggregate([
      {
        $match: {
          dealer_id: new mongoose.Types.ObjectId(dealerId),
          created_at: { $gte: dateFrom },
        },
      },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
    ]);

    const data = Array(count).fill(0);

    result.forEach((item) => {
      let index = item._id;
      if (period === "week") index = index - 1;
      if (period === "month") index = index - 1;
      if (period === "year") index = index - 1;
      if (index >= 0 && index < count) data[index] = item.count;
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
