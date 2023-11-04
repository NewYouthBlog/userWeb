<template>
	<el-config-provider :locale="locale">
		<div class="layout" style="display: block">
			<el-container>
				<el-header :class="topsrcoll ? 'top' : ''" style="height: 55px; marin: 10px; padding: 0">
					<el-affix>
						<AppHeader />
					</el-affix>
				</el-header>
				<el-main>
					<NuxtPage />
					<el-backtop style="color: green" :bottom="60"> </el-backtop>
				</el-main>
				<el-footer style="padding: 0; overflow: hidden">
					<AppFooter />
				</el-footer>
			</el-container>
		</div>
	</el-config-provider>
</template>
<script>
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export default defineComponent({
	components: {
		ElConfigProvider,
	},
	setup() {
		let scrollTop = ref("");
		let topsrcoll = ref(false); //上移样式成立
		let topage = () => {};
		onMounted(() => {
			window.addEventListener("scroll", handleScroll);
		});
		//监听页面滚动
		let handleScroll = () => {
			scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
		};
		// 监听top值的变化
		watch(scrollTop, (newValue, oldValue) => {
			// 等新值大于100的时候再做变化（优化一下）
			if (newValue > 100) {
				if (newValue > oldValue) {
					topsrcoll.value = true;
				} else {
					topsrcoll.value = false;
				}
			}
		});

		return {
			locale: zhCn,
			scrollTop,
			topage,
			topsrcoll,
		};
	},
});
</script>

<style>
html body {
	margin: 0 !important;
	padding: 0;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizeLegibility;
	font-size: var(--global-font-size);
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial,
		sans-serif;
}
.layout {
	background: radial-gradient(circle, rgba(217, 255, 254, 1) 17%, rgba(255, 235, 242, 1) 100%);
}
body {
	background-color: #f0eeee;
}
.el-container {
	min-height: 100vh;
}
.el-main {
	padding: 0;
	margin: 0;
	overflow-x: hidden;
}
.top {
	transform: translateY(-90px);
}
Header {
	position: fixed;
	z-index: 999;
	width: 100%;
	transition: all 0.5s;
}

html ::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
html ::-webkit-scrollbar-thumb {
	background-color: #efbcda;
	background-image: -webkit-linear-gradient(
		45deg,
		rgb(171, 245, 218) 25%,
		transparent 25%,
		transparent 50%,
		rgb(150, 212, 236) 50%,
		rgb(239, 147, 228) 75%,
		transparent 75%,
		transparent
	);
	border-radius: 2em;
}
html ::-webkit-scrollbar-track {
	display: none;
}
.el-card {
	background-color: rgba(255, 255, 255, 0.3);
	border: none;
	border-radius: 5px 5px 8px 8px;
}
</style>
