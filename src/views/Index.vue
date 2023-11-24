<template>
  <div>
    索引页
    <br>
    <br>
    <van-button type="primary" @click="replace('/Blog/Index')">Blog首页</van-button>
  </div>
</template>

<script lang="ts" setup>
import { replace } from '@/utils';

</script>