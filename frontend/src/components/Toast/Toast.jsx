import React from "react";
import { ToastContainer, toast } from "react-toastify";

function Toast({ type, text }) {
  const notify = () => toast(text);
  return <div>Toast</div>;
}

export default Toast;
