import { useState, useEffect } from 'react';
import { getCategories, addCategory, deleteCategory, Category } from '@/mocks/categories';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error('获取分类失败');
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes for new category
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add category form submission
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.name.trim()) {
      toast.error('分类名称不能为空');
      return;
    }

    try {
      const category = await addCategory(newCategory);
      setCategories(prev => [...prev, category]);
      setNewCategory({ name: '', description: '' });
      setIsAdding(false);
      toast.success(`成功添加分类: ${category.name}`);
    } catch (error) {
      toast.error('添加分类失败');
      console.error('Error adding category:', error);
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('确定要删除这个分类吗？此操作不可恢复。')) {
      return;
    }

    try {
      setDeleteLoading(id);
      const success = await deleteCategory(id);
      
      if (success) {
        setCategories(prev => prev.filter(category => category.id !== id));
        toast.success('分类已删除');
      } else {
        toast.error('删除分类失败');
      }
    } catch (error) {
      toast.error('删除分类失败');
      console.error('Error deleting category:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">分类管理</h1>
          <p className="text-slate-500">管理技术社区的讨论分类</p>
        </div>
        
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {isAdding ? (
            <>
              <i className="fa-solid fa-times mr-2"></i>
              取消
            </>
          ) : (
            <>
              <i className="fa-solid fa-plus mr-2"></i>
              添加分类
            </>
          )}
        </button>
      </div>

      {/* Add Category Form */}
      {isAdding && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all animate-in fade-in slide-in-from-top-5 duration-300">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">添加新分类</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">分类名称</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                placeholder="例如: Java, Python"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">分类描述</label>
              <textarea
                id="description"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-slate-900 min-h-[100px]"
                placeholder="描述这个分类的主题和讨论范围"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                保存分类
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  分类名称
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  描述
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  帖子数量
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  创建时间
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loading ? (
                // Loading state
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="fa-solid fa-spinner fa-spin text-slate-400"></i>
                      <span className="text-slate-500">加载分类中...</span>
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                // Empty state
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <i className="fa-solid fa-folder-open text-4xl mb-3 text-slate-300"></i>
                      <p>暂无分类数据</p>
                      <button
                        onClick={() => setIsAdding(true)}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        添加第一个分类
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                // Categories list
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-500 max-w-xs truncate">{category.description || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {category.postCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(category.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={deleteLoading === category.id}
                        className={cn(
                          "text-red-600 hover:text-red-900 focus:outline-none",
                          deleteLoading === category.id && "opacity-70 cursor-not-allowed"
                        )}
                      >
                        {deleteLoading === category.id ? (
                          <i className="fa-solid fa-spinner fa-spin mr-1"></i>
                        ) : (
                          <i className="fa-solid fa-trash mr-1"></i>
                        )}
                        删除
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}