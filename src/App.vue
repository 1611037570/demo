<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4"
  >
    <h1 class="text-4xl md:text-5xl font-bold text-indigo-600 mb-6">You did it!</h1>
    <div class="bg-black rounded-xl shadow-lg p-8 max-w-md w-full">
      <p class="text-gray-600 mb-4">
        Tailwind CSS has been successfully installed in your Vue 3 project.
      </p>
      <p class="text-gray-600 mb-6">
        Visit
        <a
          href="https://vuejs.org/"
          target="_blank"
          rel="noopener"
          class="text-blue-600 hover:text-blue-800 underline"
          >vuejs.org</a
        >
        to read the documentation
      </p>
      <div class="flex justify-center space-x-4">
        <span class="w-4 h-4 rounded-full bg-red-500"></span>
        <span class="w-4 h-4 rounded-full bg-yellow-500"></span>
        <span class="w-4 h-4 rounded-full bg-green-500"></span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
