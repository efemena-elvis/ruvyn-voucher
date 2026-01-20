<template>
  <div class="flex min-h-screen bg-background-subtle">
    <!-- Sidebar Navigation -->
    <aside class="flex flex-col flex-shrink-0 lg:w-64 w-52 h-screen p-4 text-white bg-neutral-800">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-x-2 group mt-6">
        <LogoIcon />
        <span class="text-2xl font-bold text-white group-hover:opacity-80 transition-opacity">
          RUVYN
        </span>
      </RouterLink>

      <!-- Navigation Links -->
      <nav class="flex-grow mt-6">
        <ul>
          <li v-for="link in sidebarLinks" :key="link.name">
            <RouterLink
              :to="link.url"
              class="flex items-center px-3 py-3 my-1 font-medium transition-colors rounded-lg"
              :class="
                isLinkActive(link.name)
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
              "
            >
              <span class="ml-3">{{ link.text }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="mt-auto">
        <button
          @click="signOut"
          class="w-full px-3 text-center py-3 my-1 font-medium  rounded-lg transition-colors bg-red-600 text-white hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </aside>

 
    <main class="flex-1 p-2 lg:p-6 ">
      <div class="container mx-auto">
        <h1 class="mb-8 text-3xl font-bold text-text-primary">{{ activeViewTitle }}</h1>

        <div class="lg:p-6 p-2 rounded-lg">
          <slot></slot>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import LogoIcon from './LogoIcon.vue'

interface SidebarLink {
  name: string
  text: string
  url: string
}

defineProps<{
  sidebarLinks: SidebarLink[]
  activeViewTitle: string
}>()


const route = useRoute()
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    router.push('/signin')
  }
})

const isLinkActive = (routeName: string): boolean => {
  return route.name === routeName
}


const signOut = () => {
  localStorage.removeItem('auth_token')

  router.push('/signin')
}
</script>

<style scoped>

</style>
