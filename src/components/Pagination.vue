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
          Prev
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
          Next
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
