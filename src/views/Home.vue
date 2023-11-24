<template>
	<van-nav-bar
		:fixed="true"
		:placeholder="true"
		v-if="routerStore.NavbarShow()"
		:title="routerStore.PageTitle()"
	>
		<template #left>
			<van-icon
				:name="routerStore.NavHomeShow() ? 'wap-home' : 'arrow-left'"
				style="font-size: 20px"
				v-if="!routerStore.TabbarShow()"
				@click="routerStore.NavHomeShow() ? replace('/') : back()"
			/>
		</template>
	</van-nav-bar>
	<div
		class="app-container"
		:style="{
			height: `calc(100vh ${
				routerStore.NavbarShow() ? '- var(--van-nav-bar-height)' : ''
			} ${routerStore.TabbarShow() ? '- var(--van-tabbar-height)' : ''})`,
		}"
	>
		<router-view />
	</div>
	<van-tabbar route v-if="routerStore.TabbarShow()">
		<van-tabbar-item
			icon="home-o"
			v-for="item in routerStore.tabbar"
			:key="item.path"
			replace
			:to="item.path"
		>
			<span>{{ item.name }}</span>
			<template #icon="props">
				<img
					:src="props.active ? item.icon.selectedIconPath : item.icon.iconPath"
					v-if="item.icon.type == 'image'"
				/>
				<van-icon
					:name="props.active ? item.icon.selectedIconPath : item.icon.iconPath"
					v-else
				/>
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script lang="ts" setup>
import useRouterStore from '@/store/modules/router'
import { back, replace } from '@/utils/'

const routerStore = useRouterStore()
</script>
<style lang="scss" scoped></style>
