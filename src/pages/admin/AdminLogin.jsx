import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500">
            Sign in to access admin dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-pink-400
                         focus:border-pink-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-pink-400
                         focus:border-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition-all bg-pink-500 rounded-lg shadow-md hover:bg-pink-600 hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-gray-400">
          © 2026 Admin Panel
        </p>
      </div>
    </div>
  );
}
