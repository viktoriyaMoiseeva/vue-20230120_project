<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="hasImage ? `--bg-url: url('${uploadedImage}')` : ''"
    >
      <span class="image-uploader__text">{{ message }}</span>
      <input
        :type="!hasImage ? 'file' : ''"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @[eventName].prevent="change"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      default: '',
    },

    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'remove'],

  data() {
    return {
      uploadedImage: this.preview,
      isLoading: false,
    };
  },

  computed: {
    message() {
      return this.uploadedImage ? 'Удалить изображение' : this.isLoading ? 'Загрузка...' : 'Загрузить изображение';
    },

    hasImage() {
      return !!this.uploadedImage;
    },

    eventName() {
      return this.uploadedImage ? 'click' : 'change';
    },
  },

  methods: {
    async change(e) {
      if (this.hasImage) {
        this.$emit('remove');
        this.uploadedImage = e.target.value = '';
      } else if (!!this.uploader) {
        this.isLoading = true;
        this.$emit('select', e.target.files[0]);
        try {
          const result = await this.uploader(e.target.files[0]);
          this.uploadedImage = result.image;
          this.$emit('upload', result);
        } catch (error) {
          this.$emit('error', error);
          this.uploadedImage = e.target.value = '';
        }
        this.isLoading = false;
      } else {
        this.$emit('select', e.target.files[0]);
        this.uploadedImage = URL.createObjectURL(e.target.files[0]);
      }
    },
  },
};
</script>

<style scoped>
/* _image-uploader.css */

.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
