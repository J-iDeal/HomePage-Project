import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  base: '/HomePage-Project/', // 替换成gitHub仓库名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // 这将“@”映射到“src”文件夹
    },
  },
  plugins: [vue()],
})
