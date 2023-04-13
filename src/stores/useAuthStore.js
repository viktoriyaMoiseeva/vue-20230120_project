import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {getUser, loginUser} from '../api/authApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
  };

  // const getUser = async () => {
  //   const result = await getUser();
  // };

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.data)
    }
  };

  return {
    user,
    isAuthenticated,
    setUser,
    getUser,
    login,
  };
});
