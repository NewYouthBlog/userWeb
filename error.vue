<template>
	<div class="page">
		<span>{{ error.statusCode }}</span>
		<p v-if="error.statusCode === 404">页面找不到了</p>
		<h3 v-if="error.statusCode === 500">服务器出错</h3>
	</div>
</template>

<script setup>
const error = useError();
</script>

<style scoped>
.page {
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: radial-gradient(circle, rgba(217, 255, 254, 1) 17%, rgba(255, 235, 242, 1) 100%);
}
.page span {
	font-size: 9rem;
	font-weight: 900;
	color: black;
}
.page h3 {
	font-size: 2rem;
	font-weight: 600;
	color: black;
}
.page p {
	font-size: 2rem;
	font-weight: 600;
	color: black;
}
</style>
