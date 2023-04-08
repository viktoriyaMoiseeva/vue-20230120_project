<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="setCurrentMonth(-1)"
        ></button>
        <div class="calendar-view__date">{{ currentMonthYear }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="setCurrentMonth(1)"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="item in calendarItems"
        :class="{ 'calendar-view__cell_inactive': !isActive(item.date) }"
        class="calendar-view__cell"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ item.date.getDate() }}</div>
        <div class="calendar-view__cell-content">
          <slot :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCalendarView',

  data() {
    return {
      currentDate: new Date(),
    };
  },

  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    calendarItems() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const firstDayWeekday = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
      const lastDay = new Date(year, month + 1, 0);
      const monthLength = lastDay.getDate();
      const lastDayWeekday = lastDay.getDay() === 0 ? 7 : lastDay.getDay();
      const items = [];

      for (let i = 1; i <= monthLength; i++) {
        const newDate = new Date(Date.UTC(year, month, i));

        items.push({ date: newDate, timestamp: +newDate });
      }

      for (let i = 1; i < firstDayWeekday; i++) {
        const prevDate = new Date(Date.UTC(year, month, 1));
        prevDate.setDate(prevDate.getDate() - i);
        items.unshift({ date: prevDate, timestamp: +prevDate });
      }

      for (let i = 0; i < 7 - lastDayWeekday; i++) {
        const nextDate = new Date(Date.UTC(year, month + 1, 0));
        nextDate.setDate(nextDate.getDate() + i + 1);
        items.push({ date: nextDate, timestamp: +nextDate });
      }

      return items;
    },
  },

  methods: {
    setCurrentMonth(direction) {
      const date = this.currentDate.getDate();
      this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + direction));
      if (this.currentDate.getDate() !== date) this.currentDate.setDate(0);
    },

    isActive(date) {
      return date.getMonth() === this.currentDate.getMonth() && date.getFullYear() === this.currentDate.getFullYear();
    },
  },
};
</script>

<style>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
