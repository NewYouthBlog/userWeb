import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 支持 Github 风格的 Markdown (可选)
import "./markdown-indigo.css";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div id="write">
      {/* 应用主题的根类 */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
