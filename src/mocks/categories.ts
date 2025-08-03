export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  postCount: number;
}

// Mock categories data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Java',
    description: 'Java programming language discussions',
    createdAt: '2025-01-15T08:30:00Z',
    postCount: 42
  },
  {
    id: '2',
    name: 'Python',
    description: 'Python programming language discussions',
    createdAt: '2025-01-15T08:35:00Z',
    postCount: 58
  },
  {
    id: '3',
    name: 'JavaScript',
    description: 'JavaScript programming language discussions',
    createdAt: '2025-01-15T08:40:00Z',
    postCount: 73
  },
  {
    id: '4',
    name: 'React',
    description: 'React framework discussions',
    createdAt: '2025-01-16T10:15:00Z',
    postCount: 36
  }
];

// Mock function to get all categories
export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...categories]);
    }, 500);
  });
};

// Mock function to add a new category
export const addCategory = (category: Omit<Category, 'id' | 'createdAt' | 'postCount'>): Promise<Category> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCategory: Category = {
        id: (categories.length + 1).toString(),
        ...category,
        createdAt: new Date().toISOString(),
        postCount: 0
      };
      
      categories.push(newCategory);
      resolve(newCategory);
    }, 500);
  });
};

// Mock function to delete a category
export const deleteCategory = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = categories.findIndex(cat => cat.id === id);
      if (index !== -1) {
        categories.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};