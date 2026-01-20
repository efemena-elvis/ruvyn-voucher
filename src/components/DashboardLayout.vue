<template>
  <div class="flex min-h-screen bg-background-subtle">
    <!-- Mobile overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="isSidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex flex-col w-64 p-4 text-white transition-transform duration-300 transform lg:static bg-neutral-800 lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center mt-6 gap-x-2 group">
        <LogoIcon />
        <span class="text-2xl font-bold text-white group-hover:opacity-80">
          RUVYN
        </span>
      </RouterLink>

      <!-- Navigation -->
      <nav class="flex-grow mt-6">
        <ul>
          <li v-for="link in sidebarLinks" :key="link.name">
            <RouterLink
              :to="link.url"
              @click="isSidebarOpen = false"
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

      <!-- Sign out -->
      <div class="mt-auto">
        <button
          @click="signOut"
          class="w-full px-3 py-3 my-1 font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-2 lg:p-6">
      <!-- Mobile header -->
      <div class="flex items-center justify-between mb-4 lg:hidden">
        <button
          @click="isSidebarOpen = true"
          class="p-2 text-white rounded-md bg-neutral-800"
        >
          ☰
        </button>

        <h1 class="mr-3 text-lg font-semibold text-text-primary">
          {{ activeViewTitle }}
        </h1>
      </div>

      <div class="container mx-auto">
        <h1 class="hidden mb-8 text-3xl font-bold lg:block text-text-primary">
          {{ activeViewTitle }}
        </h1>

        <div class="p-2 rounded-lg lg:p-6">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import LogoIcon from './LogoIcon.vue'


const isSidebarOpen = ref(false)

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
