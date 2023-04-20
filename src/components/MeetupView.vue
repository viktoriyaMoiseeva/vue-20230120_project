<template>
  <div>
    <MeetupCover :title="meetup.title" :image="meetup.image" />

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <slot />
        </div>
        <div class="meetup__aside">
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          <div class="meetup__aside-buttons" v-if="isAuthenticated">
            <UiButton
              v-if="meetup.organizing"
              tag="router-link"
              :to="{ name: 'meetup-edit', params: { meetupId: meetup.id } }"
              variant="primary"
              class="meetup__aside-button"
            >
              Редактировать
            </UiButton>

            <UiButton
              v-if="meetup.organizing"
              variant="danger"
              class="meetup__aside-button"
              @click="handleDeleteMeetup"
              :disabled="disabled"
            >
              Удалить
            </UiButton>

            <UiButton
              v-if="attending"
              variant="secondary"
              class="meetup__aside-button"
              @click="handleAttendMeetup"
              :disabled="disabled"
            >
              Отменить участие
            </UiButton>

            <UiButton
              v-if="!meetup.organizing && !attending"
              variant="primary"
              class="meetup__aside-button"
              @click="handleAttendMeetup"
              :disabled="disabled"
            >
              Участвовать
            </UiButton>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script>
import MeetupCover from './MeetupCover.vue';
import MeetupInfo from './MeetupInfo.vue';
import UiContainer from './UiContainer.vue';
import UiButton from './UiButton.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';
import { useApi } from '../composables/useApi';
import { attendMeetup, leaveMeetup, deleteMeetup } from '../api/meetupsApi';
import { ref, onUpdated } from 'vue';

export default {
  name: 'MeetupView',

  components: {
    UiButton,
    MeetupCover,
    MeetupInfo,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    const disabled = ref(false);
    const attending = ref(props.meetup.attending);
    const router = useRouter();

    onUpdated(() => {
      attending.value = props.meetup.attending;
    });

    const handleDeleteMeetup = async () => {
      const { request, result, isLoading } = useApi(deleteMeetup, { showProgress: true, successToast: 'Митап удалён' });
      disabled.value = isLoading.value;
      await request(props.meetup.id);
      if (result.value.success) {
        router.push({ name: 'meetups' });
        location.reload();
      }
      disabled.value = isLoading.value;
    };

    const handleAttendMeetup = async () => {
      const { request, result, isLoading } = useApi(attending.value ? leaveMeetup : attendMeetup, {
        showProgress: true,
        successToast: 'Сохранено',
      });
      disabled.value = isLoading.value;
      await request(props.meetup.id);
      if (result.value.success) {
        attending.value = !props.meetup.attending;
      }
      disabled.value = isLoading.value;
    };

    return {
      isAuthenticated,
      handleDeleteMeetup,
      handleAttendMeetup,
      attending,
      disabled,
    };
  },
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
