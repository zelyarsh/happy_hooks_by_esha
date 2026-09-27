import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Breadcrumb from "./Breadcrumb";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-pink-50 flex overflow-visible">

      <Sidebar />

      <div className="flex-1 ml-72 min-h-screen">

        <Topbar />

        <main className="p-8 min-h-screen">

          <Breadcrumb />

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;