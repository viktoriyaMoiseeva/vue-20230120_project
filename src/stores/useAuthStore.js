import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getUser, loginUser, registerUser } from '../api/authApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
  };

  const getUser = async () => {
    user.value = await getUser();
  };

  const login = async (email, password) => {
    user.value = await loginUser(email, password);
  };

  const register = async (data) => {
    user.value = await registerUser(data);
  };

  return {
    user,
    isAuthenticated,
    setUser,
    getUser,
    login,
    register,
  };
});
