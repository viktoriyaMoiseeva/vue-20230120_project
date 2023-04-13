export function setUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  const result = localStorage.getItem('user');
  return result ? JSON.parse(result) : null;
}

export function deleteUserFromLocalStorage() {
  delete localStorage.user;
}
