import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUsername(user.displayName);
      setIsLoggedIn(true);
      setCurrentUser(user);
      setEmail(user.email);
      setUuid(user.uid);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return { username, logout, isLoggedIn, currentUser, email, uuid };
};

export default useAuth;
