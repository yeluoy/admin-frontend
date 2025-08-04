import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import CategoryManagement from "@/pages/CategoryManagement";
import PostModeration from "@/pages/PostModeration";
import UserManagement from "@/pages/UserManagement";
import { useState, useEffect } from "react";
import { AuthContext } from '@/contexts/authContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function App() {
  // 从 localStorage 初始化 token 和认证状态
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  // 封装 setToken 以同时更新 localStorage
  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('admin_token', newToken);
    } else {
      localStorage.removeItem('admin_token');
    }
  };
  
  // 监听 token 变化来同步 isAuthenticated 状态
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);


  // 登出函数现在只负责清除前端状态
  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, setIsAuthenticated, setToken, logout }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<div className="text-center py-10">欢迎使用技术社区管理系统，请从左侧菜单选择操作</div>} />
          <Route path="dashboard" element={<div className="text-center py-10">欢迎使用技术社区管理系统，请从左侧菜单选择操作</div>} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="posts" element={<PostModeration />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </AuthContext.Provider>
  );
}
