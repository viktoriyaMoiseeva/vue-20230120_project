<template>
  <div class="toast" :class="`toast_${type}`">
    <slot />
    <button class="toast__close" @click="closeToast">X</button>
  </div>
</template>

<script>
export default {
  name: 'UiToast',

  props: {
    timeOut: {
      type: Number,
      default: 5000,
    },

    type: {
      type: String,
      default: 'success',
    },

    id: {
      type: Number,
      default: 0,
    },
  },

  emits: ['deleteToast'],

  methods: {
    closeToast() {
      this.$emit('deleteToast');
    },
  },

  created() {
    setTimeout(() => {
      this.closeToast();
    }, this.timeOut);
  },
};
</script>

<style scoped>
.toast {
  position: relative;
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

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast__close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
