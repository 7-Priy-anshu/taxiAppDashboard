import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { role } = useParams();
  const { user } = useAuth();

  // Validate role
  if (role !== user.role) {
    return <div>Access Denied</div>;
  }

  // dynamic render
  switch (role) {
    case "superadmin":
      return <SuperAdminDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "hr":
      return <HrDashboard />;
    default:
      return <div>Invalid role</div>;
  }
}
