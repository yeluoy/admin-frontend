import { useState } from 'react';
import { searchUsers, updateUserStatus, User } from '@/mocks/users';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Handle user search
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    try {
      setLoading(true);
      const results = await searchUsers(searchTerm);
      setUsers(results);
      
      if (results.length === 0) {
        toast.info(`未找到匹配"${searchTerm}"的用户`);
      }
    } catch (error) {
      toast.error('搜索用户失败');
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle user status change (ban/unban)
  const handleStatusChange = async (userId: string, username: string, currentStatus: 'active' | 'banned') => {
    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    const action = newStatus === 'banned' ? '封禁' : '解封';
    
    if (!confirm(`确定要${action}用户 "${username}" 吗？`)) {
      return;
    }

    try {
      setActionLoading(userId);
      const updatedUser = await updateUserStatus(userId, newStatus);
      
      if (updatedUser) {
        setUsers(prev => 
          prev.map(user => user.id === userId ? updatedUser : user)
        );
        toast.success(`用户 "${username}" 已${action}`);
      } else {
        toast.error(`${action}用户失败`);
      }
    } catch (error) {
      toast.error(`${action}用户失败`);
      console.error(`Error ${action} user:`, error);
    } finally {
      setActionLoading(null);
    }
  };

  // Clear search results
  const handleClearSearch = () => {
    setSearchTerm('');
    setUsers([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">用户管理</h1>
        <p className="text-slate-500">搜索和管理社区用户账号</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="输入用户名搜索..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-900"
            />
            <i class="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              {loading ? (
                <>
                  <i class="fa-solid fa-spinner fa-spin mr-2"></i>
                  搜索中...
                </>
              ) : (
                <>
                  <i class="fa-solid fa-search mr-2"></i>
                  搜索
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleClearSearch}
              disabled={!searchTerm && users.length === 0}
              className="px-4 py-2 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <i class="fa-solid fa-times mr-2"></i>
              清除
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {users.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-medium text-slate-900">搜索结果</h3>
            <span className="text-sm text-slate-500">找到 {users.length} 个用户</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    用户名
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    邮箱
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    帖子数量
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    最后登录
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{user.username}</div>
                          <div className="text-sm text-slate-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'active' ? '正常' : '已封禁'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {user.postCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(user.joinDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(user.lastLogin).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleStatusChange(user.id, user.username, user.status)}
                        disabled={actionLoading === user.id}
                        className={cn(
                          "px-3 py-1 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
                          actionLoading === user.id
                            ? "opacity-70 cursor-not-allowed"
                            : user.status === 'active'
                              ? "text-red-600 bg-red-50 hover:bg-red-100 focus:ring-red-500"
                              : "text-green-600 bg-green-50 hover:bg-green-100 focus:ring-green-500"
                        )}
                      >
                        {actionLoading === user.id ? (
                          <i class="fa-solid fa-spinner fa-spin mr-1"></i>
                        ) : user.status === 'active' ? (
                          <i class="fa-solid fa-user-slash mr-1"></i>
                        ) : (
                          <i class="fa-solid fa-user-check mr-1"></i>
                        )}
                        {user.status === 'active' ? '封禁' : '解封'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && users.length === 0 && searchTerm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="flex flex-col items-center">
            <i class="fa-solid fa-search text-5xl text-slate-300 mb-4"></i>
            <h3 className="text-lg font-medium text-slate-900 mb-1">未找到匹配的用户</h3>
            <p className="text-slate-500 mb-4">尝试使用不同的搜索词或检查拼写</p>
            <button
              onClick={() => setSearchTerm('')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i class="fa-solid fa-eraser mr-2"></i>
              清除搜索条件
            </button>
          </div>
        </div>
      )}
      
      {/* Initial state - no search performed */}
      {!loading && users.length === 0 && !searchTerm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="flex flex-col items-center">
            <i class="fa-solid fa-users text-5xl text-slate-300 mb-4"></i>
            <h3 className="text-lg font-medium text-slate-900 mb-1">用户管理</h3>
            <p className="text-slate-500 mb-4">使用上方搜索框查找用户并管理其账号状态</p>
          </div>
        </div>
      )}
    </div>
  );
}