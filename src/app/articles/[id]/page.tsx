import MarkdownRenderer from "@/components/MarkDownRender/MarkDownRender";

interface props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ({ params }: props) {
  const { id } = await params;
  //FIX: use database
  const content = `
# Markdown 渲染示例

这是 **粗体** 和 *斜体* 文本。

# 列表示例

- 项目一
- 项目二
  - 子项目二点一
  - 子项目二点二

# 表格示例

| 标题一 | 标题二 |
| ------ | ------ |
| 内容一 | 内容二 |
| 内容三 | 内容四 |

## 代码块示例
\`\`\`python
function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("World");
print("eitsnaro")
\`\`\`
I **love** using [Next.js](https://nextjs.org/)
`;
  return <MarkdownRenderer content={content}></MarkdownRenderer>;
}
