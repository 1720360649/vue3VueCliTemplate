<template>
	<van-config-provider
		:class="themeStore.theme"
		:theme-vars="{ primaryColor: themeStore.themeColor }"
		theme-vars-scope="global"
	>
		<router-view></router-view>
	</van-config-provider>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import useThemeStore from '@/store/modules/theme'
import useRouterStore from '@/store/modules/router'
import { getRoute } from '@/utils/createRoutes'
import router from '@/router'
import { history } from './utils'

const themeStore = useThemeStore()

/**
 * 路由初始化 路由状态监听
 */
const routerStore = useRouterStore()

let route = getRoute()
if (route) {
	routerStore.pages = route.pages
	routerStore.tabbar = route.tabbar
}

watch(
	() => router.currentRoute.value.path,
	(toPath) => {
		routerStore.path = toPath
		setTimeout(() => {
			routerStore.history = history.get()
		}, 10)
	},
	{ immediate: true, deep: true }
)
</script>
<style lang="scss">
@import './theme.scss';

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	user-select: none;

	// navbar颜色
	--van-nav-bar-background: var(--uni-all-color);
	--van-nav-bar-icon-color: var(--uni-text-color);
	--van-nav-bar-text-color: var(--uni-text-color);
	--van-nav-bar-title-text-color: var(--uni-text-color);
	--van-nav-bar-arrow-size: 19px;
}

.app-container {
	overflow: hidden;
	overflow-y: auto;
	width: 100vw;
	background-color: rgba($color: gray, $alpha: 0.1);
}
</style>
