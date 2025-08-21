<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    aria-hidden="true"
    class="w-10 h-10"
  >
    <g>
      <!-- The main shield shape in the darker color -->
      <path
        d="M 50 10 L 90 30 V 60 Q 90 90 50 90 Q 10 90 10 60 V 30 Z"
        fill="var(--color-primary-700)"
      />
      <!-- The single shape in the lighter color that forms the 'R' with negative space -->
      <path
        d="M 30 35 H 55 Q 70 35 70 50 Q 70 65 55 65 H 50 L 70 80 H 55 L 35 65 H 30 Z"
        fill="var(--color-primary-100)"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
// This is a purely presentational component, so no script logic is needed.
</script>
