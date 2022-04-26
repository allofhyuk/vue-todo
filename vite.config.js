import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/icon/icon.scss"; @import "@/assets/base.scss"; @import "@/assets/animation.scss"; @import "@/assets/variable/color.scss"; @import "@/assets/mixin/mixin.scss";`
      }
    }
  }
})
