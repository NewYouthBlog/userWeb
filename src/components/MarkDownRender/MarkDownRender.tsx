"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown-indigo.css";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  useEffect(() => {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll("#write pre");
    
    codeBlocks.forEach((block) => {
      // 检查是否已经添加过按钮
      if (block.querySelector(".copy-code-button")) return;
      
      const button = document.createElement("button");
      button.className = "copy-code-button";
      button.title = "复制代码";
      button.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;
      
      button.addEventListener("click", async () => {
        const code = block.querySelector("code");
        if (code) {
          try {
            await navigator.clipboard.writeText(code.textContent || "");
            button.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;
            button.classList.add("copied");
            
            setTimeout(() => {
              button.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              `;
              button.classList.remove("copied");
            }, 2000);
          } catch (err) {
            console.error("复制失败:", err);
          }
        }
      });
      
      block.appendChild(button);
    });
  }, [content]);

  return (
    <div id="write">
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
