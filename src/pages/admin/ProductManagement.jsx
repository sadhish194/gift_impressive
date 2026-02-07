import AdminLayout from "../../components/admin/AdminLayout";

export default function ProductManagement() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800">
          + Add Product
        </button>
      </div>

      <div className="overflow-hidden bg-white shadow rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-gray-600 bg-gray-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="p-4">Gift Box</td>
              <td className="p-4 font-semibold">₹999</td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded">
                  Birthday
                </span>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded">
                  In Stock
                </span>
              </td>
              <td className="p-4 space-x-3">
                <button className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
