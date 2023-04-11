/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import { createToaster } from './plugins/toaster/index.js';
import { createProgress } from './plugins/progress/index.js';
const app = createApp(App);
const pinia = createPinia();


app.config.unwrapInjectedRef = true;

app
  .use(router)
  .use(pinia)
  .use(
    createToaster({
      container: '#toaster',
    }),
  )
  .use(
    createProgress({
      container: '#progress',
      router,
    }),
  )
  .mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
