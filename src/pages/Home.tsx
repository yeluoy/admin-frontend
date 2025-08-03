import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-radial opacity-20 dark:opacity-10">
          <div className="absolute -inset-[50%] bg-gradient-to-r from-blue-500 to-indigo-600 blur-[128px] opacity-20"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">欢迎使用管理系统</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-xl text-slate-600 dark:text-slate-300">
            这是一个功能完善的管理平台，帮助您高效管理内容、用户和数据。
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              登录系统
            </Link>
            <Link
              to="/admin-dashboard"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
            >
              查看仪表盘
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              强大功能，简单操作
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400">
              我们的管理系统提供直观的界面和丰富的功能，满足您的各种管理需求
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <i className="fa-solid fa-users text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">用户管理</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                轻松管理用户账户、权限和角色，确保系统安全访问。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <i className="fa-solid fa-file-text text-green-600 dark:text-green-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">内容管理</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                发布、编辑和管理各类内容，支持多种格式和媒体类型。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <i className="fa-solid fa-chart-bar text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">数据分析</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                通过直观的图表和报表，深入了解系统运行状况和用户行为。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">© 2025 管理系统. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}