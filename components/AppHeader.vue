<template>
	<div id="header">
		<el-menu
			:default-active="route.path"
			:router="true"
			class="el-menu-demo"
			mode="horizontal"
			active-text-color="#95d475"
			:ellipsis="false"
			@select="handleSelect"
		>
			<!--

			<img src="/favicon.png" />
		-->
			<div class="flex-grow" />
			<el-menu-item index="/"
				><el-icon><HomeFilled /></el-icon>主页</el-menu-item
			>
			<el-menu-item index="/timeline"
				><el-icon><CameraFilled /></el-icon>归档</el-menu-item
			>
		</el-menu>
	</div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { HomeFilled, CameraFilled } from "@element-plus/icons-vue";
const route = useRoute();
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
</script>

<style scoped>
.flex-grow {
	flex-grow: 1;
	background-color: transparent;
}
.el-menu-demo {
	background-color: transparent;
}
#header img {
	height: 5vh;
}
#header {
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
}
ul {
	height: 100%;
	width: 100%;
}
.el-menu--horizontal.el-menu {
	border-bottom: 0;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
	background-color: transparent;
}
</style>
