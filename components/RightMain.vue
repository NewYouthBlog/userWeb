<template>
	<div class="block">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>所有标签</span>
					<!--
					<el-button class="button" text>Operation button</el-button>
					-->
				</div>
			</template>
			<div class="tags">
				<div v-for="tag in tags" :key="tag.ID" class="text item">
					<a :href="`/${tag.name}`">
						<el-button
							size="small"
							:color="`${tag.name === name ? '#95d475' : ''}`"
							type="info"
							plain
							>{{ tag.name }}</el-button
						>
					</a>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { request } from "~/util/requests";

type tagdata = {
	ID: number;
	name: string;
};

const tags = ref<tagdata[]>([]);
const route = useRoute();
const name = route.params.tag;
const { data } = await request<tagdata[]>("/tags/findall");
tags.value = data.value!.data as tagdata[];
</script>
<style scoped>
.block {
	margin: 10px;
}
.card-header {
	display: flex;
	justify-content: center;
	align-items: center;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
	margin: 5px;
}
.box-card {
	background-color: rgba(255, 255, 255, 0.3);
	border: none;
	border-radius: 5px 5px 8px 8px;
}
.el-card ::v-deep(.el-card__body) .tags {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
