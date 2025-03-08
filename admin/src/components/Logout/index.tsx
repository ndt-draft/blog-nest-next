import auth from "@/lib/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.clear();
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
