<template>
	<div class="page-header">
		<div class="route-font">
			<slot></slot>
		</div>
	</div>
</template>
<style scoped>
.page-header {
	width: 100vw;
	height: 40vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	background-image: url("https://blog-1308532731.cos.ap-guangzhou.myqcloud.com/400246.jpg");
	background-color: #8a7e90;
	background-position: 0% 13%;
	background-size: cover;
}

.page-header .route-font {
	font-size: 3.2rem;
	font-weight: 500;
	line-height: 2.4;
	text-align: center;
	color: #fff;
	z-index: 999;
	cursor: pointer;
	transition: all 0.3s;
	text-shadow: 0 1px 0 hsl(174, 5%, 80%), 0 2px 0 hsl(174, 5%, 75%), 0 3px 0 hsl(174, 5%, 70%),
		0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2),
		0 5px 10px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
}
</style>
