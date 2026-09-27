import { Link } from "react-router-dom";

import StatsCards from "../../components/admin/dashboard/StatsCards";
import SalesChart from "../../components/admin/dashboard/SalesChart";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import TopProducts from "../../components/admin/dashboard/TopProducts";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import LatestCustomers from "../../components/admin/dashboard/LatestCustomers";

function Dashboard() {
  return (
    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">

          Welcome Back

        </p>

        <h1 className="text-4xl font-bold mt-2">

          Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Monitor your crochet business in one place.

        </p>

      </div>

      <StatsCards />

      <div className="grid lg:grid-cols-2 gap-8">

        <SalesChart />

        <RevenueChart />

      </div>

      {/* Quick Access */}

      <div>

        <h2 className="text-3xl font-bold mb-6">

          Quick Access

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Link
            to="/admin/products"
            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition"
          >

            <h3 className="text-2xl font-bold">

              Products

            </h3>

            <p className="text-gray-500 mt-3">

              Manage all products.

            </p>

          </Link>

          <Link
            to="/admin/new-arrivals"
            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition"
          >

            <h3 className="text-2xl font-bold">

              New Arrivals

            </h3>

            <p className="text-gray-500 mt-3">

              Homepage featured products.

            </p>

          </Link>

          <Link
            to="/admin/media"
            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition"
          >

            <h3 className="text-2xl font-bold">

              Media Library

            </h3>

            <p className="text-gray-500 mt-3">

              Upload images & videos.

            </p>

          </Link>

          <Link
            to="/admin/homepage"
            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition"
          >

            <h3 className="text-2xl font-bold">

              Homepage

            </h3>

            <p className="text-gray-500 mt-3">

              Manage banners & sections.

            </p>

          </Link>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <TopProducts />

        <LatestCustomers />

      </div>

      <RecentOrders />

    </div>
  );
}

export default Dashboard;