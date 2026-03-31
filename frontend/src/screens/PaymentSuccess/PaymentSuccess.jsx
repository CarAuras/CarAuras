import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./PaymentSuccess.css";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";
import { PLAN_CONFIRMATION_API_URL } from "../../config/api";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { plan } = useParams();

  useEffect(() => {
    if (user && plan) {
      const completePaymentConfirmation = async () => {
        const res = await axios.post(
          `${PLAN_CONFIRMATION_API_URL}/${user._id}`,
          { plan }
        );
        if (res && res.status == 200) {
          const timer = setTimeout(() => navigate("/profile"), 2000);
          return () => clearTimeout(timer);
        }
      };
      completePaymentConfirmation();
    }
  }, [user, plan, navigate]);

  return (
    <div id="payment-success-container">
      <div id="payment-success-card">
        <div id="payment-success-icon">
          <CheckCircleOutlineIcon style={{ fontSize: "4rem" }} />
        </div>

        <h1>Payment Successful!</h1>
        <p>
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>

        <div id="invoice-alert">
          <p>An invoice has been sent to your email.</p>
        </div>

        <button onClick={() => navigate("/")}>Back to Home</button>

        <small>You will be redirected automatically in 5 seconds...</small>
      </div>
    </div>
  );
};

export default PaymentSuccess;
