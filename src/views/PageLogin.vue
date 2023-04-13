<template>
  <LayoutAuth title="Вход">
    <UiForm>
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" required />
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit" block @click="handleSubmit">Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта? <UiLink :to="{ name: 'register' }" class="link">Зарегистрируйтесь</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
import { TOASTER_KEY } from '../plugins/toaster/index.js';
import { useAuthStore } from '../stores/useAuthStore.js';
import { ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiLink from '../components/UiLink.vue';
import UiInput from '../components/UiInput.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';

export default {
  name: 'PageLogin',

  components: {
    LayoutAuth,
    UiForm,
    UiButton,
    UiInput,
    UiLink,
    UiFormGroup,
  },

  setup() {
    const authStore = useAuthStore();
    const toaster = inject(TOASTER_KEY);
    const email = ref('');
    const password = ref('');
    const route = useRoute();
    const router = useRouter();

    const handleSubmit = async () => {
      await authStore.login(email.value, password.value);
      if (authStore.isAuthenticated) {
        toaster.success('Авторизация прошла успешно');
        router.push({ path: route.query.from ?? '/' });
      } else toaster.error('Неверные учётные данные...');
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
