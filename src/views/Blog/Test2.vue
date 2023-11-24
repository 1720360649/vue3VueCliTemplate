<template>
  <div>
    <van-button type="primary" @click="goAndCloseAll('/Blog/Test')">Test</van-button>
  </div>
</template>
<script lang="ts" setup>
import { goAndCloseAll } from '@/utils/route'
</script>