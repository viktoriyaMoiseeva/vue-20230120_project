/** @implements {import('vue-router').RouterScrollBehavior} */
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else if (to.hash) {
    return {
      el: to.hash,
    };
  } else if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
    return {};
  } else {
    return { top: 0, left: 0 };
  }
}
