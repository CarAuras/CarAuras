import axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from "../constants/userConstants";
import { SIGN_IN_URL } from "../config/api";

export const signIn = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });

  try {
    const { data } = await axios.post(
      SIGN_IN_URL,
      { email, password },
      { withCredentials: true }
    );
    if (data && data.success) {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: "Invalid credentials",
      });
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error?.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message,
    });
  }
};
