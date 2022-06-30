<script setup lang="ts">
const majors = [['dentistry', '临床医学'], ['primaryEducation', '小学教育']]
const type = [['1', '普通考生'], ['2', '专项计划'], ['3', '退伍']]

const currentMajor = $ref(majors[0][0])
const currentType = $ref(type[0][0])

const yourScore = $ref(0)

const { data, pending } = useFetch<{ code: number; data: any; msg: string }>(() => `/api/jcut-ranking?major=${currentMajor}`)

watchEffect(() => {
  if (data.value && data.value.code !== 200)
    alert(data.value.msg)
})

const ranks = computed(() => data.value?.data)

// // 普通考生
// const normal = computed(() => ranks.value?.filter((rank: any) => rank.type === 1))
// // 转向
// const specialized = computed(() => ranks.value?.filter((rank: any) => rank.type === 2))
// // 退伍
// const veterans = computed(() => ranks.value?.filter((rank: any) => rank.type === 3))

const filteredRanks = computed<any[]>(() => ranks.value?.filter((rank: any) => rank.type === currentType))

const yourRank = computed(() => {
  // 在数组中找到yourScore的排名
  const rank = filteredRanks.value.findIndex((rank: any) => Number(rank.score) === Number(yourScore))

  if (rank === -1)
    return '未找到该分数的排名'
  return rank + 1
})

const sameScore = computed(() => {
  const _ = filteredRanks.value.reduce((acc, cur) => {
    if (Number(cur.score) === Number(yourScore))
      return acc + 1
    return acc
  }, 0)
  return _
})
</script>

<template>
  <div>
    <h1 text-teal-600 text-3xl>
      荆楚理工专区
    </h1>
    <Suspense>
      <div>
        <div mt-4>
          <div text-warmGray>
            选择专业
          </div>
          <select
            v-model="currentMajor" laceholder="专业" autocomplete="off" p="x-4 y-2" m="t-5" w="250px" text="center"
            bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
          >
            <option v-for="([major, name]) in majors" :key="major" :value="major" dark:bg-dark>
              {{ name }}
            </option>
          </select>
        </div>
        <div mt-4>
          <div text-warmGray>
            选择类型
          </div>
          <select
            v-model="currentType" laceholder="类型" autocomplete="off" p="x-4 y-2" m="t-5" w="250px" text="center"
            bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
          >
            <option v-for="([typeId, title]) in type" :key="typeId" :value="typeId" dark:bg-dark>
              {{ title }}
            </option>
          </select>
        </div>
        <div mt-4>
          <div text-warmGray>
            您的分数
          </div>

          <input
            id="score" v-model="yourScore" min="0" max="1000" placeholder="您的分数" type="number" p="x-4 y-2" m="t-5" w="250px"
            text="center" bg="transparent" border="~ rounded gray-200 dark:gray-700" outline="none active:none"
          >
        </div>

        <div v-if="yourScore > 0" inline-block mt-4 border="~ rounded gray-200 dark:gray-700" p-4>
          <span>您的分数所在排名：</span>
          <span text-teal px-2 font-bold>{{ yourRank }}</span>
          <template v-if="sameScore > 1">
            <span ml-2>同分人数：</span>
            <span text-teal px-2 font-bold>{{ sameScore }}</span>
            <span>人</span>
          </template>
        </div>

        <div v-if="pending" m-4>
          加载中...
        </div>
        <div mt-4>
          <div>分数总览 {{ filteredRanks?.length }} 条</div>
          <ul h-100 overflow-y-scroll>
            <li v-for="(row, idx) in filteredRanks" :key="idx">
              排名：<span mr-4 font-bold font-italic>
                {{ idx + 1 }}
              </span>
              分数： {{ row.score }}
            </li>
          </ul>
        </div>
      </div>
      <!--  -->

      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </suspense>
  </div>
</template>
