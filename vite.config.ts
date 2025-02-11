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
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      defaultExportByFilename: true,
      dirs: ['src/composables/**'],
      eslintrc: {
        enabled: true,
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
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