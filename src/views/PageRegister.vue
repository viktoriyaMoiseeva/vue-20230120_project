<template>
  <LayoutAuth title="Регистрация">
    <UiForm>
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" required />
      </UiFormGroup>
      <UiFormGroup label="Имя">
        <UiInput v-model="fullname" name="fullname" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup label="Повтор пароля">
        <UiInput v-model="password2" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup>
        <UiCheckbox v-model="agree" name="agree" required>Я согласен с условиями</UiCheckbox>
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit" @click="handleSubmit">Зарегистрироваться</UiButton>
      </template>

      <template #append>
        Уже есть аккаунт?
        <UiLink :to="{ name: 'login' }">Войдите</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
import { TOASTER_KEY } from '../plugins/toaster/index.js';
import { registerUser } from '../api/authApi';
import { ref, inject } from 'vue';
import {useRouter } from 'vue-router';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiInput from '../components/UiInput.vue';
import UiCheckbox from '../components/UiCheckbox.vue';
import UiLink from '../components/UiLink.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';

export default {
  name: 'PageRegister',

  components: {
    UiForm,
    UiButton,
    UiLink,
    UiCheckbox,
    UiInput,
    UiFormGroup,
    LayoutAuth,
  },

  setup() {
    const email = ref('');
    const fullname = ref('');
    const password = ref('');
    const password2 = ref('');
    const agree = ref(false);
    const toaster = inject(TOASTER_KEY);
    const router = useRouter();

    const validate = () => {
      if (password.value !== password2.value) {
        return 'Пароли не совпадают';
      }
      if (!agree.value) {
        return 'Требуется согласится с условиями';
      }
    };

    const handleSubmit = async () => {
      const validationError = validate();
      if (validationError) {
          toaster.error(validationError);
      }

        const result = await registerUser(fullname.value, email.value, password.value);
        if (result.success) {
            router.push({name: 'login'});
            toaster.success('Регистрация выполнена успешно');
        } else toaster.error(result.error.message);
    };

    return {
      email,
      fullname,
      password,
      password2,
      agree,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
