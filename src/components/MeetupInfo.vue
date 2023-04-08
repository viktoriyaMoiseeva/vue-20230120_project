<template>
  <ul class="meetup-info">
    <li>
      <UiIcon icon="user" class="meetup-info__icon" />
      {{ organizer }}
    </li>
    <li>
      <UiIcon icon="map" class="meetup-info__icon" />
      {{ place }}
    </li>
    <li>
      <UiIcon icon="cal-lg" class="meetup-info__icon" />
      <time :datetime="formatAsIsoDate(date)">
        {{ formatAsLocalDate(date) }}
      </time>
    </li>
  </ul>
</template>

<script>
import UiIcon from './UiIcon.vue';
import { formatAsIsoDate, formatAsLocalDate } from '../utils/dateUtils';

export default {
  name: 'MeetupInfo',

  components: {
    UiIcon,
  },

  props: {
    organizer: {
      type: String,
      required: true,
      default: '',
    },

    place: {
      type: String,
      required: true,
      default: '',
    },

    date: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  methods: {
    formatAsIsoDate,
    formatAsLocalDate,
  },
};
</script>

<style scoped>
/* _meetup-info.css */

.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
