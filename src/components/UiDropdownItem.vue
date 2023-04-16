<template>
  <button type="button">
    <ui-icon v-if="icon" :icon="icon" class="dropdown__icon" />
    <span>{{ title }}</span>
  </button>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiDropdownItem',

  components: { UiIcon },

  props: {
    title: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped></style>
