<template>
	<div class="article">
		<el-row :gutter="10" justify="center">
			<el-col :sm="24" :md="10" :lg="10">
				<el-col>
					<!--手机端用抽屉显示文章目录-->
					<el-affix>
						<el-button
							style="margin-top: 15%"
							class="hidden-sm-and-up"
							type="primary"
							@click="drawer = true"
							round
						>
							目录
						</el-button>
					</el-affix>
					<client-only>
						<el-drawer size="80%" v-model="drawer" title="目录" :with-header="false">
							<client-only>
								<MdCatalog :editorId="md_moudle" :scrollElement="scrollElement" />
							</client-only> </el-drawer
					></client-only>
				</el-col>
				<MdPreview
					:preview-theme="preview_theme"
					:code-theme="code_theme"
					:editor-id="md_moudle"
					:model-value="article.content"
					style="
						border-radius: 5px 5px 8px 8px;
						box-shadow: var(--card-box-shadow) !important;
						background: rgba(255, 255, 255, 0.3);
						transition: all 0.3s;
						padding: 20px;
					"
				/>
			</el-col>
			<el-col :sm="24" :md="4" :lg="4">
				<ElCard shadow="never" class="hidden-sm-and-down">
					<template #header>
						<div class="card-header">
							<span style="font-size: 18px; font-weight: 600">文章目录</span>
						</div>
					</template>
					<client-only fallback="目录生成中...">
						<MdCatalog :editorId="md_moudle" :scrollElement="scrollElement" />
					</client-only>
				</ElCard>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import "element-plus/theme-chalk/display.css";
import { useRoute } from "vue-router";
import { articlesData, request } from "~/util/requests";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const drawer = ref(false);
const route = useRoute();
const id = route.params.id;
const preview_theme = "cyanosis";
const code_theme = "atom";
const scrollElement = ref<HTMLElement>();

onMounted(() => {
	// 必须挂载dom之后才能操作dom
	scrollElement.value = document.documentElement as HTMLElement;
});

interface article {
	ID: number;
	title: string;
	content: string;
	status: number;
	image: string;
	headimg: string;
	UpdatedAt: string;
}

const md_moudle = "preview-only";

const { data } = await request<article>("/article/" + id);
if (data.value! === null) {
	throw createError({
		statusCode: 404,
	});
}
const article = (data.value!.data as articlesData<article>).articles;
</script>

<style scoped>
.article {
	margin-top: 5.5vh;
}
.el-card ::v-deep(.el-card__body) {
	max-height: 80vh;
	overflow: auto;
	padding: 20px;
	font-size: 0.8rem;
}
.el-card {
	position: fixed;
	width: 13vw;
	background-color: rgba(255, 255, 255, 0.5);
	border: none;
	border-radius: 5px 5px 8px 8px;
	box-shadow: var(--card-box-shadow) !important;
	transition: all 0.3s;
}
</style>
