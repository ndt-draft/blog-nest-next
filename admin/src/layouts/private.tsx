import auth from "@/lib/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const PrivateLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default PrivateLayout;
