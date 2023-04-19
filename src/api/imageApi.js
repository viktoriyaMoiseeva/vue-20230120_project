import { httpClient } from './httpClient/httpClient.js';

/**
 * Загрузить изображение
 * @param {File} file - HTML File с изображением
 * @returns {Promise<ResultContainer<ImageDto>>}
 */
export function postImage(file) {
  return httpClient.post('/images/upload', file);
}
