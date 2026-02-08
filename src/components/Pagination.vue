<template>
  <div class="pagination-container">
    <ul class="pagination-list">
      <li>
        <button
          href="#"
          class="pagination-link"
          aria-label="Previous page"
          @click.prevent="emit('prev')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="pagination-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </li>

      <li class="pagination-info">{{ page }} / {{ pages }}</li>

      <li>
        <button
          href="#"
          class="pagination-link"
          aria-label="Next page"
          @click.prevent="emit('next')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="pagination-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  page: number
  pages: number
}

defineProps<Props>()

const emit = defineEmits(['prev', 'next'])
</script>
