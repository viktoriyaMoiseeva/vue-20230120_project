import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  // Решение
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const progressBarInstance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());

  const progressBar = {
    start: progressBarInstance.start,
    finish: progressBarInstance.finish,
    fail: progressBarInstance.fail,

    install(app) {
      app.provide(PROGRESS_KEY, progressBar);
    },
  };

  if (router) {
    router.beforeEach(() => {
      progressBar.start();
    });

    router.afterEach(() => {
      progressBar.finish();
    });

    router.onError(() => {
      progressBar.fail();
    })
  }

  return progressBar;
}
