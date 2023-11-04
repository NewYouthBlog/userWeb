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
					:timestamp="index.toString()"
					:hollow="true"
				>
					<a v-for="content in activity" :href="`/article/${content.ID}`" target="_blank"
						><p>
							{{ content.Title }}
						</p></a
					>
				</el-timeline-item>
			</el-timeline>
		</div>
	</main>
</template>

<script lang="ts" setup>
import { articlesData, request } from "~/util/requests";

type Activity = {
	ID: number;
	CreatedAt: string;
	Title: string;
	color?: string;
};

const { data } = await request<Activity[]>("/article/archive");
const articleList = (data.value!.data as articlesData<Activity[]>).articles;
// 取出articleList中的CreatedAt字段,并去重，成为一个数组
const dates = Array.from(new Set(articleList.map((item) => item.CreatedAt.slice(0, 4))));
// 将dates中的年份作为key，以颜色作为value，组成一个对象
const colors = dates.reduce((colors: any, date, index) => {
	switch (index) {
		case 0:
			colors[date] = "#5cbfef";
			break;
		case 1:
			colors[date] = "#0bbd87";
			break;
		case 2:
			colors[date] = "#ff9900";
			break;
		case 3:
			colors[date] = "#ff6699";
			break;
		case 4:
			colors[date] = "#ff3300";
			break;
		case 5:
			colors[date] = "#ff0066";
			break;
		case 6:
			colors[date] = "#ff0000";
			break;
		default:
			colors[date] = "#5cbfef";
	}
	return colors;
}, {});

// 以timestamp为key，将activities分组
let groups = articleList.reduce((groups: any, activity) => {
	const date: any = activity.CreatedAt.slice(0, 10);
	if (!groups[date]) {
		groups[date] = [];
	}
	groups[date].push(activity);
	groups[date].color = colors[date.slice(0, 4)];
	return groups;
}, {});

console.log(groups);
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
