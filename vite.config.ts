import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // <-- 删除或者注释掉这一行
      },
    },
    port: 3002, // 注意：您的 package.json 脚本中指定的是 3002 端口
  },
});
