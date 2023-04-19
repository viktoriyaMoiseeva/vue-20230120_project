import { createToaster } from '../plugins/toaster/index.js';
import { postImage } from '../api/imageApi';
import { ref } from 'vue';

export async function useImageApi(file) {
  const result = ref(null);
  const toaster = createToaster({ container: '#toaster' });

  const data = new FormData();
  data.append('file', file);

  result.value = await postImage(data);

  if (result.value.error) {
    return toaster.error(result.value.error.message);
  }

  return {
    result,
  };
}
