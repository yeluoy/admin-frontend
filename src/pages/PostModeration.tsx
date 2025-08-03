import { useState, useEffect } from 'react';
import { getPosts, updatePostStatus, Post } from '@/mocks/posts';
import { updateUserStatus } from '@/mocks/users';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function PostModeration() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [banLoading, setBanLoading] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Fetch posts based on active tab
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts(activeTab);
        setPosts(data);
        
        // Auto-select first post if any
        if (data.length > 0) {
          setSelectedPost(data[0]);
        } else {
          setSelectedPost(null);
        }
      } catch (error) {
        toast.error('获取帖子失败');
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab]);

  // Handle post approval
  const handleApprove = async (postId: string) => {
    try {
      setActionLoading(postId);
      const updatedPost = await updatePostStatus(postId, 'approved');
      
      if (updatedPost) {
        setPosts(prev => prev.filter(post => post.id !== postId));
        toast.success('帖子已通过审核');
        
        // Update selected post if it's the one being approved
        if (selectedPost?.id === postId) {
          setSelectedPost(posts.length > 1 ? posts[1] : null);
        }
      } else {
        toast.error('操作失败，帖子不存在');
      }
    } catch (error) {
      toast.error('审核帖子失败');
      console.error('Error approving post:', error);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle post rejection
  const handleReject = async (postId: string) => {
    try {
      setActionLoading(postId);
      const updatedPost = await updatePostStatus(postId, 'rejected');
      
      if (updatedPost) {
        setPosts(prev => prev.filter(post => post.id !== postId));
        toast.success('帖子已拒绝');
        
        // Update selected post if it's the one being rejected
        if (selectedPost?.id === postId) {
          setSelectedPost(posts.length > 1 ? posts[1] : null);
        }
      } else {
        toast.error('操作失败，帖子不存在');
      }
    } catch (error) {
      toast.error('拒绝帖子失败');
      console.error('Error rejecting post:', error);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle user banning
  const handleBanUser = async (userId: string, username: string) => {
    if (!confirm(`确定要封禁用户 "${username}" 吗？`)) {
      return;
    }

    try {
      setBanLoading(userId);
      const updatedUser = await updateUserStatus(userId, 'banned');
      
      if (updatedUser) {
        toast.success(`用户 "${username}" 已被封禁`);
      } else {
        toast.error('封禁用户失败');
      }
    } catch (error) {
      toast.error('封禁用户失败');
      console.error('Error banning user:', error);
    } finally {
      setBanLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">帖子审核</h1>
        <p className="text-slate-500">审核用户发布的帖子内容</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('pending')}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm",
                activeTab === 'pending'
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              待审核
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {posts.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm",
                activeTab === 'approved'
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              已通过
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm",
                activeTab === 'rejected'
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              已拒绝
            </button>
          </nav>
        </div>

        {/* Posts List and Preview */}
        <div className="p-0 md:p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Posts List */}
            <div className="w-full md:w-1/3 border border-slate-200 rounded-lg overflow-hidden h-[300px] md:h-[500px] flex flex-col">
              <div className="p-3 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-700">
                帖子列表
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex items-center space-x-2">
                      <i class="fa-solid fa-spinner fa-spin text-slate-400"></i>
                      <span className="text-slate-500">加载中...</span>
                    </div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 p-4 text-center">
                    <i class="fa-solid fa-newspaper text-4xl mb-3 text-slate-300"></i>
                    <p>此状态下暂无帖子</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-200">
                    {posts.map((post) => (
                      <li key={post.id}>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className={cn(
                            "w-full text-left p-3 text-sm hover:bg-slate-50 transition-colors",
                            selectedPost?.id === post.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                          )}
                        >
                          <div className="font-medium text-slate-900 truncate">{post.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-slate-500">
                              {post.author.username}
                            </span>
                            <span className="text-xs text-slate-400">
                              {formatDistanceToNow(new Date(post.createdAt), { 
                                addSuffix: true,
                                locale: zhCN
                              })}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Post Preview */}
            <div className="w-full md:w-2/3 border border-slate-200 rounded-lg overflow-hidden h-[300px] md:h-[500px] flex flex-col">
              {selectedPost ? (
                <>
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">{selectedPost.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-slate-600">
                          <i class="fa-solid fa-user mr-1 text-slate-400"></i>
                          {selectedPost.author.username}
                        </span>
                        <span className="text-slate-600">
                          <i class="fa-solid fa-folder mr-1 text-slate-400"></i>
                          {selectedPost.categoryName}
                        </span>
                        <span className="text-slate-500">
                          {formatDistanceToNow(new Date(selectedPost.createdAt), { 
                            addSuffix: true,
                            locale: zhCN
                          })}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleBanUser(selectedPost.author.id, selectedPost.author.username)}
                        disabled={banLoading === selectedPost.author.id}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center"
                      >
                        {banLoading === selectedPost.author.id ? (
                          <i class="fa-solid fa-spinner fa-spin mr-1"></i>
                        ) : (
                          <i class="fa-solid fa-user-slash mr-1"></i>
                        )}
                        封禁用户
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 text-slate-700">
                    <div className="whitespace-pre-line">{selectedPost.content}</div>
                    
                    {selectedPost.content.length < 100 && (
                      <div className="mt-4 text-slate-400 italic text-sm">
                        帖子内容较短...
                      </div>
                    )}
                  </div>
                  
                  {activeTab === 'pending' && (
                    <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3">
                      <button
                        onClick={() => handleReject(selectedPost.id)}
                        disabled={actionLoading === selectedPost.id}
                        className={cn(
                          "px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
                          actionLoading === selectedPost.id
                            ? "bg-red-400 text-white cursor-not-allowed"
                            : "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                        )}
                      >
                        {actionLoading === selectedPost.id ? (
                          <>
                            <i class="fa-solid fa-spinner fa-spin mr-1"></i>
                            处理中...
                          </>
                        ) : (
                          <>
                            <i class="fa-solid fa-times mr-1"></i>
                            拒绝
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleApprove(selectedPost.id)}
                        disabled={actionLoading === selectedPost.id}
                        className={cn(
                          "px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
                          actionLoading === selectedPost.id
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        )}
                      >
                        {actionLoading === selectedPost.id ? (
                          <>
                            <i class="fa-solid fa-spinner fa-spin mr-1"></i>
                            处理中...
                          </>
                        ) : (
                          <>
                            <i class="fa-solid fa-check mr-1"></i>
                            通过
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 p-4 text-center">
                  <i class="fa-solid fa-arrow-left-right text-4xl mb-3 text-slate-300"></i>
                  <p>请从左侧列表选择一个帖子查看详情</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}