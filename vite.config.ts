import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'element-plus': ['ElMessage']
        }
      ],
      dts: true,
      resolvers: [ElementPlusResolver()],
      vueTemplate: true
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          'vue': ['vue']
        }
      }
    }
  },
  server: {
    port: 5174,
    open: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}) 