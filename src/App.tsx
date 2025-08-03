import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import CategoryManagement from "@/pages/CategoryManagement";
import PostModeration from "@/pages/PostModeration";
import UserManagement from "@/pages/UserManagement";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
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
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
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
