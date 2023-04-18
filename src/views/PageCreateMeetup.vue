<template>
  <layout-meetup-form title="Создание митапа">
    <MeetupForm :meetup="meetup" @submit="submit" @cancel="cancel" />
  </layout-meetup-form>
</template>

<script>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import { postMeetup } from '../api/meetupsApi';
import { useRouter } from 'vue-router';
import { useApi } from '../composables/useApi';

export default {
  name: 'PageCreateMeetup',

  components: {
    MeetupForm,
    LayoutMeetupForm,
  },

  setup() {
    const meetup = ref(createMeetup());

    const router = useRouter();

    const submit = async (data) => {
      const { request, result } = useApi(postMeetup, {
        showProgress: true,
        successToast: 'Сохранено',
        errorToast: true,
      });
      await request(data);
      if (result.value.success) {
        router.push({ name: 'meetup', params: { meetupId: result.value.data.id } });
      }
    };

    const cancel = () => {
      router.push({ name: 'meetups' });
    };

    return {
      meetup,
      submit,
      cancel,
    };
  },
};
</script>

<style scoped></style>
