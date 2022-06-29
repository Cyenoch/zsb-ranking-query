<script setup lang="ts">
const route = useRoute()
let rank = $ref(route.query.rank)

watchEffect(() => {
  rank = (route.query.rank as string)
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <div i-twemoji:waving-hand text-4xl inline-block animate-shake-x animate-duration-5000 />
    <h3 text-2xl font-500 mt-4>
      您的排名
    </h3>
    <div text-4xl mt-4 font-lighter>
      第 <span px-2 font-bold>{{ rank }}</span> 名!
    </div>

    <div mt-4>
      <NuxtLink
        class="btn m-3 text-sm"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
