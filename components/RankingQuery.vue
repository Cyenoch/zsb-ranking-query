<script setup lang="ts">
import { WhcibeRankProvider, WuitRankProvider } from '~~/common/impl'
import type { IRankProvider } from '~~/common/interface'

const { data } = await useFetch('/api/pageview')

const router = useRouter()

// const rankProvider = $ref<IRankProvider | null>()
// const usernameString = computed(() => rankProvider?.getUsernameString())

const username = $ref('')
const password = $ref('')

let loading = $ref(false)

const providers = {
  wuitProvider: new WuitRankProvider(),
  whcibeProvider: new WhcibeRankProvider(),
} as Record<string, IRankProvider>

const currentProviderKey = $ref(Object.keys(providers)[0])
const currentProvider = computed<IRankProvider>(() => providers[currentProviderKey])
const usernameStr = computed(() => currentProvider.value.getUsernameString())

const go = () => {
  loading = true
  currentProvider.value.getRankLevel(username, password).then((data: any) => {
    if (data.code !== 200)
      return alert(data.msg)
    else
      return router.push({ path: '/ranking/result', query: { rank: data.data } })
  }).then(() => {}).catch((err) => {
    alert(`未知异常情况！\n${err.message}\n若重试后任然如此，请尝试联系开发者!`)
    console.error(err)
  }).finally(() => {
    loading = false
  })
}
</script>

<template>
  <div text-gray:80 flex flex-col justify-center items-center>
    <select
      id="rankingProvider" v-model="currentProviderKey" placeholder="院校" autocomplete="off" p="x-4 y-2" m="t-5" w="250px" text="center"
      bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none" @keydown.enter="go"
    >
      <option v-for="collage in Object.keys(providers)" :key="collage" :value="collage">
        {{ providers[collage].getCollageName() }}
      </option>
    </select>
    <!--  -->
    <input
      id="username" v-model="username" :placeholder="usernameStr" type="text" p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
      @keydown.enter="go"
    >
    <!--  -->
    <input
      id="password" v-model="password" placeholder="密码" type="password" p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
      @keydown.enter="go"
    >

    <div v-if="!loading">
      <button m-3 text-sm btn @click="go">
        GO
      </button>
    </div>
    <div v-else m-3 text-sm>
      查询中...
    </div>
  </div>

  <SecurityWarning />
</template>
