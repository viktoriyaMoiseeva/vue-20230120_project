<template>
  <layout-meetup-form title="Редактирование митапа">
    <MeetupForm v-if="meetup" :meetup="meetup" @submit="submit" @cancel="cancel" />
    <UiContainer v-else>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  </layout-meetup-form>
</template>

<script>
import { ref, watch } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { getMeetup, putMeetup } from '../api/meetupsApi';
import { useRouter } from 'vue-router';
import { useApi } from '../composables/useApi';
import { useImageApi } from '../composables/useImageApi';

export default {
  name: 'PageEditMeetup',

  components: {
    LayoutMeetupForm,
    UiAlert,
    UiContainer,
    MeetupForm,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  async beforeRouteEnter(to) {
    const result = await getMeetup(+to.params.meetupId);
    if (result.success) {
      return (vm) => {
        vm.setMeetup(result.data);
      };
    } else {
      return { name: 'meetups' };
    }
  },

  setup(props) {
    const meetup = ref(null);

    const error = ref(null);

    const fetchMeetup = async () => {
      const result = await getMeetup(props.meetupId);
      if (result.success) {
        meetup.value = result.data;
      } else {
        error.value = result.error.message;
      }
    };

    watch(() => props.meetupId, fetchMeetup);

    const setMeetup = (value) => (meetup.value = value);

    const router = useRouter();

    const submit = async (data) => {
      if (data.imageToUpload) {
        const { result } = await useImageApi(data.imageToUpload);
        data.image = result.value.data.image;
        data.imageId = result.value.data.id;
      }

      const { request, result } = useApi(putMeetup, { showProgress: true, successToast: 'Сохранено' });
      await request(data);
      if (result.value.success) {
        goToMeetupPage();
      }
    };

    const cancel = () => {
      goToMeetupPage();
    };

    const goToMeetupPage = () => {
      router.push({ name: 'meetup', meetupId: props.meetupId });
    };

    return {
      meetup,
      error,
      setMeetup,
      submit,
      cancel,
    };
  },
};
</script>

<style scoped></style>
