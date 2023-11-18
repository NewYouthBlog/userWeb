<template>
	<PageHeaders
		style="
			background-image: url('https://blog-1308532731.cos.ap-guangzhou.myqcloud.com/416969.jpg');
		"
	>
		<span>博客时间线</span>
	</PageHeaders>
	<main class="main">
		<div class="container">
			<el-timeline>
				<el-timeline-item
					v-for="(activity, index) in groups"
					:key="index"
					:color="activity.color"
					placement="top"
					:timestamp="activity._id.year + '-' + activity._id.month + '-' + activity._id.day"
					:hollow="true"
				>
					<a v-for="content in activity.articles" :href="`/article/${content._id}`" target="_blank"
						><p>
							{{ content.title }}
						</p></a
					>
				</el-timeline-item>
			</el-timeline>
		</div>
	</main>
</template>

<script lang="ts" setup>
import { request } from "~/util/requests";

type articles = {
	_id: string;
	createdAt: string;
	title: string;
};

type Activity = {
	_id: { year: number; month: number; day: number };
	articles: articles[];
	color: string;
};

const groups = ref<Activity[]>([]);
const { data } = await request<Activity[]>("/archive");
groups.value = data.value!.data as Activity[];
//根据年份设置颜色
groups.value.forEach((item) => {
	if (item._id.year === 2022) {
		item.color = "#0bbd87";
	} else if (item._id.year === 2023) {
		item.color = "#5cbfef";
	} else if (item._id.year === 2024) {
		item.color = "#f0ad4e";
	} else if (item._id.year === 2025) {
		item.color = "#d9534f";
	} else if (item._id.year === 2026) {
		item.color = "#5cbfef";
	} else if (item._id.year === 2027) {
		item.color = "#f0ad4e";
	}
});
</script>

<style scoped>
a {
	color: #5cbfef;
	text-decoration: none;
}
a :hover {
	color: #0bbd87;
}
.container {
	max-width: 50%;
	margin: 0 auto;
}
.main {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 15px;
}
.container {
	display: flex;
	justify-content: space-between;
	max-width: 1300px;
}

p {
	font-size: 16px;
}
</style>
