import { Link, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/products" },
    { name: "Cart Users", path: "/admin/carts" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-6 text-white bg-gradient-to-b from-black to-gray-900">
        <h2 className="mb-10 text-2xl font-bold tracking-wide">
          Admin Panel
        </h2>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded transition ${
                location.pathname === item.path
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/admin/login"
            className="block px-4 py-2 mt-6 text-red-400 rounded hover:bg-gray-700"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Admin</span>
            <div className="flex items-center justify-center text-white bg-black rounded-full w-9 h-9">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
