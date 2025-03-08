import auth from "@/lib/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

const PublicLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loggedIn()) {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="flex place-items-center justify-center h-screen text-center">
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

export default PublicLayout;
