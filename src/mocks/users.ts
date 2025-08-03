export interface User {
  id: string;
  username: string;
  email: string;
  status: 'active' | 'banned';
  joinDate: string;
  postCount: number;
  lastLogin: string;
}

// Mock users data
export const users: User[] = [
  {
    id: '101',
    username: 'javadev',
    email: 'java@example.com',
    status: 'active',
    joinDate: '2025-01-10T08:30:00Z',
    postCount: 12,
    lastLogin: '2025-08-02T15:45:00Z'
  },
  {
    id: '102',
    username: 'pythondata',
    email: 'python@example.com',
    status: 'active',
    joinDate: '2025-02-15T10:20:00Z',
    postCount: 8,
    lastLogin: '2025-08-01T09:30:00Z'
  },
  {
    id: '103',
    username: 'reactmaster',
    email: 'react@example.com',
    status: 'active',
    joinDate: '2025-01-20T14:10:00Z',
    postCount: 15,
    lastLogin: '2025-08-03T11:20:00Z'
  },
  {
    id: '104',
    username: 'jsguru',
    email: 'js@example.com',
    status: 'banned',
    joinDate: '2025-03-05T16:45:00Z',
    postCount: 5,
    lastLogin: '2025-07-28T13:10:00Z'
  },
  {
    id: '105',
    username: 'javaexpert',
    email: 'expert@example.com',
    status: 'active',
    joinDate: '2025-02-28T09:15:00Z',
    postCount: 20,
    lastLogin: '2025-08-03T10:05:00Z'
  },
  {
    id: '106',
    username: 'webdev',
    email: 'web@example.com',
    status: 'active',
    joinDate: '2025-04-12T11:30:00Z',
    postCount: 7,
    lastLogin: '2025-08-02T16:25:00Z'
  }
];

// Mock function to search users by username
export const searchUsers = (username: string): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = username 
        ? users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))
        : [...users];
      resolve(results);
    }, 500);
  });
};

// Mock function to get user by ID
export const getUserById = (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(u => u.id === id);
      resolve(user ? {...user} : null);
    }, 500);
  });
};

// Mock function to update user status (ban/unban)
export const updateUserStatus = (id: string, status: 'active' | 'banned'): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(u => u.id === id);
      if (user) {
        user.status = status;
        resolve({...user});
      } else {
        resolve(null);
      }
    }, 500);
  });
};