import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('开始登录请求，用户名:', username);
      
      // 简化的请求配置
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      console.log('响应状态:', response.status);
      console.log('响应 headers:', response.headers);

      if (!response.ok) {
        console.error('请求失败，状态码:', response.status);
        
        // 尝试获取错误信息
        const errorText = await response.text();
        console.error('错误响应内容:', errorText);
        
        toast.error(`登录失败 (${response.status})`);
        setLoading(false);
        return;
      }

      const result = await response.json();
      console.log('登录响应:', result);

      if (result.success && result.data && result.data.token) {
        setIsAuthenticated(true);
        setToken(result.data.token);
        toast.success('登录成功');
        navigate('/admin/dashboard');
      } else {
        console.error('登录业务逻辑失败:', result);
        toast.error(result.message || '登录失败');
        setLoading(false);
      }
    } catch (error) {
      console.error('网络请求异常:', error);
      toast.error('网络连接失败');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">技术社区管理系统</h1>
            <p className="text-slate-300">管理员登录</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-200 mb-1">账号</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="输入管理员账号"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-1">密码</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="输入管理员密码"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  登录中...
                </>
              ) : (
                '登录'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}