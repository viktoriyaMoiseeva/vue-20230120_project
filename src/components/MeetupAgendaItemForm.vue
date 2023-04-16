<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemOptions" name="type" v-model="localAgendaItem.type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" name="startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup v-for="(item, key) in $options.agendaItemFormSchemas[localAgendaItem.type]" :label="item.label">
      <component :is="item.component" :name="key" v-bind="item.props" v-model="localAgendaItem[key]" />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import { agendaItemFormSchemas, agendaItemOptions } from '../services/meetupService';
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

export default {
  name: 'MeetupAgendaItemForm',
  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  agendaItemOptions,
  agendaItemFormSchemas,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['remove', 'update:agendaItem'],

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.localAgendaItem });
      },
    },

    'localAgendaItem.startsAt': {
      handler(newVal, oldVal) {
        const endsAt = new Date('1970-01-01T' + this.localAgendaItem.endsAt);
        const oldTime = new Date('1970-01-01T' + oldVal);
        const newTime = new Date('1970-01-01T' + newVal);

        let difference = endsAt - oldTime;
        const hours = Math.floor(difference / 1000 / 60 / 60);
        difference -= hours * 1000 * 60 * 60;
        const minutes = Math.floor(difference / 1000 / 60);
        difference -= minutes * 1000 * 60;

        endsAt.setHours(newTime.getHours() + hours);
        endsAt.setMinutes(newTime.getMinutes() + minutes);

        this.localAgendaItem.endsAt = endsAt.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      },
    },
  },
};
</script>

<style scoped>
/* _agenda-item-form.css */

.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
