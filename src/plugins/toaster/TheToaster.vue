<template>
  <div class="toasts" v-if="toasts.length">
    <ui-toast
      :id="toast.id"
      :key="toast.id"
      :type="toast.type"
      @deleteToast="deleteToast(toast.id)"
      v-for="toast in toasts"
    >
      <ui-icon :icon="toast.icon" class="toast__icon" />
      <span>{{ toast.message }}</span>
    </ui-toast>
  </div>
</template>

<script>
import UiIcon from '@/components/UiIcon.vue';
import UiToast from '@/components/UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast },

  data() {
    return {
      toasts: [],
      lastId: 0,
    };
  },

  methods: {
    success(message) {
      this.addToast(message);
    },

    error(message) {
      this.addToast(message, 'error', 'alert-circle');
    },

    addToast(message, type = 'success', icon = 'check-circle') {
      const newToast = {
        message: message,
        type: type,
        icon: icon,
        id: this.lastId++,
      };

      this.toasts.push(newToast);
    },

    deleteToast(id) {
      const deletedToastIndex = this.toasts.findIndex((toast) => toast.id === id);
      this.toasts.splice(deletedToastIndex, 1);
    },
  },
};
</script>

<style scoped>
/* _toaster.css */
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
