import AdminLayout from "../../components/admin/AdminLayout";

export default function CartUsers() {
  // 🔥 Dynamic data (replace with API later)
  const cartUsers = [
    {
      id: 1,
      user: "Admin User",
      product: "Gift Box",
      quantity: 2,
      total: 1998,
      status: "Active",
    },
    {
      id: 2,
      user: "John Doe",
      product: "Flower Bouquet",
      quantity: 1,
      total: 999,
      status: "Pending",
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Cart Users
        </h1>
        <p className="text-sm text-gray-500">
          Users who currently have items in their cart
        </p>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-gray-600 bg-pink-50">
            <tr>
              <th className="p-4 font-medium text-left">User</th>
              <th className="p-4 font-medium text-left">Product</th>
              <th className="p-4 font-medium text-center">Qty</th>
              <th className="p-4 font-medium text-right">Total</th>
              <th className="p-4 font-medium text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {cartUsers.length > 0 ? (
              cartUsers.map((item) => (
                <tr
                  key={item.id}
                  className="transition border-t hover:bg-pink-50"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {item.user}
                  </td>

                  <td className="p-4 text-gray-600">
                    {item.product}
                  </td>

                  <td className="p-4 text-center">
                    {item.quantity}
                  </td>

                  <td className="p-4 font-semibold text-right text-gray-800">
                    ₹{item.total}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-8 text-center text-gray-500"
                >
                  No cart users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
