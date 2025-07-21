import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function HRDashboard() {
  const user = {
    role: "hr",
    permissions: [],
  };

  return (
    <div className="flex">
      <Sidebar role={user.role} permissions={user.permissions} />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">hr Dashboard</h1>
        <p>Welcome, hr!</p>
      </main>
    </div>
  );
}
