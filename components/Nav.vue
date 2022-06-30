<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const menus = [
  {
    name: '标准查询',
    path: '/ranking',
  },
  {
    name: '荆楚理工专区',
    path: '/special-jcut',
  },
]

const router = useRouter()
const route = useRoute()

const breakPoints = useBreakpoints(breakpointsTailwind)

const currentMenuPath = computed(() => route.path)

let menuOpenned = $ref(false)

const goto = (path: string) => {
  console.log(1)

  router.push(path)
}

watch(breakPoints.sm, () => {
  if (breakPoints.md)
    menuOpenned = false
})
</script>

<template>
  <div sticky dark:bg-dark bg-light inset-t-0 inset-x-0 transition-all flex flex-row items-center px-4 py-2 b-b-2 dark:b-teal-800 shadow-md>
    <div flex-shrink-0 text-current font-bold>
      <span>专升本排名查询</span>
    </div>

    <!-- for mobile -->
    <template flex flex-row w-full sm:display-none>
      <div grow />
      <DarkToggle mr-4 />
      <div cursor-pointer text-xl p-2 inline-block flex self-center hover:bg="[rgba(125,125,125,0.1)]" rounded @click="menuOpenned = !menuOpenned">
        <span class="i-carbon-menu" />
      </div>
    </template>

    <!-- for desktop -->
    <template display-none flex-row w-full sm:display-flex>
      <ul flex flex-row ml-4>
        <li v-for="menu in menus" :key="menu.name" :class="{ 'text-teal': currentMenuPath.startsWith(menu.path) }" hover:bg="[rgba(125,125,125,0.1)]" rounded ml-2 px-2 py="1.5" cursor-pointer @click="goto(menu.path)">
          {{ menu.name }}
        </li>
      </ul>
      <div grow />
      <DarkToggle />
    </template>
  </div>

  <div v-show="menuOpenned" p-4 pb-2 inset-x-0 bg-light dark:bg-dark b-b-1 border-color="[rgba(100,100,100,0.2)]" inset-t="100%">
    <ul flex flex-col>
      <li v-for="menu in menus" :key="menu.name" :class="{ 'text-teal': currentMenuPath.startsWith(menu.path) }" hover:bg="[rgba(125,125,125,0.1)]" m-b-2 rounded px-2 py="1.5" cursor-pointer @click="goto(menu.path)">
        {{ menu.name }}
      </li>
    </ul>
  </div>
</template>
