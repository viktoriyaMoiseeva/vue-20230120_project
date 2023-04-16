<template>
  <LayoutBase>
    <RouterView>
      <template #default="{ Component }">
        <KeepAlive v-if="Component" :max="3">
          <component :is="Component" />
        </KeepAlive>
      </template>
      <template #fallback>
        <UiAlert>Загрузка...</UiAlert>
      </template>
    </RouterView>
    <div id="progress"></div>
  </LayoutBase>
</template>

<script>
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import { httpClient } from './api/httpClient/httpClient.js';
import { useAuthStore } from './stores/useAuthStore';
import { deleteUserFromLocalStorage } from './services/authService';
import { useToaster } from './plugins/toaster/index.js';

export default {
  name: 'App',

  components: {
    UiAlert,
    LayoutBase,
  },

  setup() {
    const toaster = useToaster();

    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      authStore.getCurrentUser();
    }

    httpClient.onUnauthenticated(() => {
      deleteUserFromLocalStorage();
      location.reload();
    });

    httpClient.onNetworkError(() => {
      toaster.error('Проблема с сетью');
    });

    window.addEventListener('error', (event) => {
      console.error(event);
      toaster.error(event.message);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
      toaster.error(event.reason);
    });
  },
};
</script>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
