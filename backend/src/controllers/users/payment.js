require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.createPaymentIntent = async (req, res) => {
  try {
    // const { amount, currency, paymentMethodType, plan, interval } = req.body;

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount,
    //   currency,
    //   payment_method_types: [paymentMethodType],
    //   metadata: {
    //     plan,
    //     interval,
    //   },
    // });

    // res.json({
    //   clientSecret: paymentIntent.client_secret,
    // });

    res.json({ success: true });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
};
