<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <RankingQuery />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>加载中...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
