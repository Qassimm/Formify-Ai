"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SideBar from "./_components/SideBar";

const DashboardLayout = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <div>
      <div className="md:w-64 fixed">
        <SideBar/>
      </div>

      <div className="ml-64">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
