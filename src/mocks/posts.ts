export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  categoryId: string;
  categoryName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Mock posts data
export const posts: Post[] = [
  {
    id: '1',
    title: 'Java并发编程最佳实践',
    content: '本文讨论了Java并发编程中的一些最佳实践和常见陷阱...',
    author: {
      id: '101',
      username: 'javadev'
    },
    categoryId: '1',
    categoryName: 'Java',
    status: 'pending',
    createdAt: '2025-08-01T10:30:00Z',
    updatedAt: '2025-08-01T10:30:00Z'
  },
  {
    id: '2',
    title: 'Python数据分析入门教程',
    content: '这是一个面向初学者的Python数据分析教程，涵盖了NumPy和Pandas的基础知识...',
    author: {
      id: '102',
      username: 'pythondata'
    },
    categoryId: '2',
    categoryName: 'Python',
    status: 'pending',
    createdAt: '2025-08-01T14:20:00Z',
    updatedAt: '2025-08-01T14:20:00Z'
  },
  {
    id: '3',
    title: 'React Hooks完全指南',
    content: '深入探讨React Hooks的使用方法和最佳实践，包括useState, useEffect等...',
    author: {
      id: '103',
      username: 'reactmaster'
    },
    categoryId: '4',
    categoryName: 'React',
    status: 'approved',
    createdAt: '2025-07-30T09:15:00Z',
    updatedAt: '2025-07-30T11:20:00Z'
  },
  {
    id: '4',
    title: 'JavaScript异步编程模式',
    content: '比较不同的JavaScript异步编程模式：回调、Promise和async/await...',
    author: {
      id: '104',
      username: 'jsguru'
    },
    categoryId: '3',
    categoryName: 'JavaScript',
    status: 'rejected',
    createdAt: '2025-07-29T16:45:00Z',
    updatedAt: '2025-07-30T08:10:00Z'
  },
  {
    id: '5',
    title: 'Java 17新特性详解',
    content: 'Java 17带来了许多新特性，本文将详细介绍这些变化以及如何在项目中应用它们...',
    author: {
      id: '105',
      username: 'javaexpert'
    },
    categoryId: '1',
    categoryName: 'Java',
    status: 'pending',
    createdAt: '2025-08-02T09:15:00Z',
    updatedAt: '2025-08-02T09:15:00Z'
  }
];

// Mock function to get posts with filtering
export const getPosts = (status?: 'pending' | 'approved' | 'rejected'): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status) {
        resolve([...posts.filter(post => post.status === status)]);
      } else {
        resolve([...posts]);
      }
    }, 500);
  });
};

// Mock function to update post status
export const updatePostStatus = (id: string, status: 'approved' | 'rejected'): Promise<Post | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find(p => p.id === id);
      if (post) {
        post.status = status;
        post.updatedAt = new Date().toISOString();
        resolve({...post});
      } else {
        resolve(null);
      }
    }, 500);
  });
};