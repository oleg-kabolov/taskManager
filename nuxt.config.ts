// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
<<<<<<< HEAD
  css: ["@/assets/styles/main.css"],
=======
  css: ["@/assets/styles/main.css", "@/assets/styles/normalize.css"],
>>>>>>> 56054e1693ae2e7f6bb80808f39a5bc67adac894
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";',
        },
      },
    },
  },
});
