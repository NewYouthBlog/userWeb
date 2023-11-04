<template>
	<PageHeaders>
		<span>和{{ name }}相关的文章</span>
	</PageHeaders>
	<el-row :gutter="10" justify="center" style="margin: 0; padding: 0">
		<el-col :xs="24" :sm="18" :md="12" :lg="9">
			<SomeArticle />
		</el-col>
		<el-col :xs="0" :sm="18" :md="24" :lg="5">
			<RightMain />
		</el-col>
	</el-row>
</template>
<script lang="ts" setup>
const route = useRoute();
const name = route.params.tag;
</script>

<style scoped>
a {
	color: #000;
	text-decoration: none;
}
</style>
