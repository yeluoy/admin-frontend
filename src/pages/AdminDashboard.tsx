import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';


export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('已成功退出登录');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg z-10 flex-shrink-0 hidden md:block">
        <div className="flex items-center justify-center h-16 bg-blue-600 text-white">
          <h1 className="text-xl font-bold">技术社区管理</h1>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              to="/admin/categories"
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                location.pathname === "/admin/categories"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              )}
            >
              <i className="fa-solid fa-folder-open w-5 h-5 mr-3"></i>
              分类管理
            </Link>
            <Link
              to="/admin/posts"
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                location.pathname === "/admin/posts"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              )}
            >
              <i className="fa-solid fa-newspaper w-5 h-5 mr-3"></i>
              帖子审核
            </Link>
            <Link
              to="/admin/users"
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                location.pathname === "/admin/users"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-slate-100 text-slate-700 hover:text-blue-600"
              )}
            >
              <i className="fa-solid fa-users w-5 h-5 mr-3"></i>
              用户管理
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button className="md:hidden mr-4 text-slate-500 hover:text-slate-700">
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
              <h2 className="text-lg font-semibold text-slate-800">管理员控制台</h2>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <i className="fa-solid fa-sign-out-alt mr-2"></i>
                退出登录
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}