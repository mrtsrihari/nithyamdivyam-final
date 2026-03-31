import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import useAdminStore from '../../store/adminStore';
import { HomeIcon, ClipboardDocumentListIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const navItems = [
  { to: '/admin/dashboard', icon: HomeIcon, label: 'Dashboard' },
  { to: '/admin/orders', icon: ClipboardDocumentListIcon, label: 'Orders' },
];

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdminStore();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary min-h-screen flex flex-col fixed left-0 top-0 z-40 shadow-xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <p className="font-heading font-bold text-white text-sm leading-none">Nithyam Divyam</p>
              <p className="text-white/50 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white text-xs mb-2 transition-colors">
            ← Back to Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        <div className="p-8 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
