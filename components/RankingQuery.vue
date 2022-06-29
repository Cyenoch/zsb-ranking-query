<script setup lang="ts">
import { WuitRankingProvider } from '~~/common/impl'
import type { ICollageRankingProvider } from '~~/common/interface'

const { data } = await useFetch('/api/pageview')

const router = useRouter()

let rankingProvider = $ref<ICollageRankingProvider | null>()

const username = $ref('')
const password = $ref('')

const wuitProvider = new WuitRankingProvider()

onMounted(() => {
  rankingProvider = wuitProvider
})

const go = () => {
  rankingProvider?.getRanking(username, password).then((data: any) => {
    router.push({ path: '/ranking/result', query: { rank: data.data } })
  })
}
</script>

<template>
  <div text-gray:80 flex flex-col justify-center items-center>
    <select
      id="rankingProvider" v-model="rankingProvider" placeholder="院校" autocomplete="off" p="x-4 y-2" m="t-5" w="250px" text="center"
      bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none" @keydown.enter="go"
    >
      <option :value="wuitProvider">
        武昌工学院
      </option>
    </select>
    <!--  -->
    <input
      id="username" v-model="username" placeholder="账号" type="text" p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
      @keydown.enter="go"
    >
    <!--  -->
    <input
      id="password" v-model="password" placeholder="密码" type="password" p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button m-3 text-sm btn :disabled="!rankingProvider" @click="go">
        GO
      </button>
    </div>
  </div>
</template>
