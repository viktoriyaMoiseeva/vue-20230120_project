<template>
  <UiCalendarView v-slot="{ item }">
    <UiCalendarEvent v-for="meetup in meetupsMap[item.timestamp]" tag="a" :href="`/meetups/${meetup.id}`">
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsMap() {
      const result = {};

      for (let i = 0; i < this.meetups.length; i++) {
        if (!result[this.meetups[i].date]) {
          result[this.meetups[i].date] = [];
        }
        result[this.meetups[i].date].push(this.meetups[i]);
      }

      return result;
    },
  },
};
</script>

<style scoped></style>
