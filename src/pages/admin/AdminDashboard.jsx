import AdminLayout from "../../components/admin/AdminLayout";
import { Users, Package, ShoppingCart } from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of your admin panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Users */}
        <div className="p-6 transition bg-white border shadow-sm rounded-2xl hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                10
              </h2>
            </div>
            <div className="p-3 text-pink-600 bg-pink-100 rounded-xl">
              <Users size={26} />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="p-6 transition bg-white border shadow-sm rounded-2xl hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                25
              </h2>
            </div>
            <div className="p-3 text-pink-600 bg-pink-100 rounded-xl">
              <Package size={26} />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="p-6 transition bg-white border shadow-sm rounded-2xl hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                8
              </h2>
            </div>
            <div className="p-3 text-pink-600 bg-pink-100 rounded-xl">
              <ShoppingCart size={26} />
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
