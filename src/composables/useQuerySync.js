import { useRouter, useRoute } from 'vue-router';
import { watch, ref } from 'vue';
import { klona } from 'klona';

export function useQuerySync(view, filter) {
  const router = useRouter();
  const route = useRoute();
  const query = ref({});

  watch(view, (current, previous) => {
    current !== 'list' ? (query.value.view = current) : delete query.value.view;
  });

  watch(
    () => filter.value.date,
    (current, previous) => {
      current !== 'all' ? (query.value.date = current) : delete query.value.date;
    },
  );

  watch(
    () => filter.value.participation,
    (current, previous) => {
      if (current !== 'all') {
        query.value.participation = current;
      }
    },
  );

  watch(
    () => route.query.participation,
    (current, previous) => {
      filter.value.participation = current ?? 'all';
    },
  );

  watch(
    () => filter.value.search,
    (current, previous) => {
      current ? (query.value.search = current) : delete query.value.search;
    },
  );

  watch(
    () => klona(query.value),
    (state, prevState) => {
      router.push({ query: state });
    },
    { deep: true },
  );
}
