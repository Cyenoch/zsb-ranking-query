<script setup>
useHead({
  title: '专升本查排名',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <NuxtLayout cl>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
