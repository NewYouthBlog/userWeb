<template>
	<el-carousel height="50vh" :interval="8000" arrow="always">
		<el-carousel-item v-for="data in headline" :key="data.ID">
			<a :href="`/article/${data.ID}`" target="_blank">
				<img
					:src="`https://blog-1308532731.cos.ap-guangzhou.myqcloud.com/${data.headimg}`"
					alt=""
				/>
				<div class="vcenter">{{ data.title }}</div>
			</a>
		</el-carousel-item>
	</el-carousel>
	<el-row :gutter="10" justify="center" style="max-width: 100cw">
		<el-col :xs="24" :sm="24" :md="24" :lg="8">
			<SomeArticle />
		</el-col>
		<el-col :xs="0" :sm="24" :md="24" :lg="4">
			<RightMain />
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { request, articlesData } from "~/util/requests";
type Article = {
	headimg: string;
	status: number;
	ID: number;
	title: string;
};

const headline = ref<Article[]>([]);

const { data } = await request<Article[]>("/headline");
headline.value = (data.value!.data as articlesData<Article[]>).articles;
</script>

<style scoped>
.el-main {
	padding: 0;
	margin: 0;
}
.el-carousel__item img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	margin: 0;
	padding: 0;
}
.vcenter {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: white;
	font-size: 2rem;
	font-weight: bold;
	font-family: "Consolas";
}
</style>
