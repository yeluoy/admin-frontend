import { createContext } from "react";

// 定义 Context 的类型接口
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

// 创建 Context，并提供默认值
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  setIsAuthenticated: () => {},
  setToken: () => {},
  logout: () => {},
});
