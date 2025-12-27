"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown-indigo.css";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

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

    // 为所有图片添加点击预览功能
    const images = document.querySelectorAll("#write img");
    images.forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        setPreviewImage((img as HTMLImageElement).src);
        setScale(1);
      });
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("click", () => {});
      });
    };
  }, [content]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleClose = () => {
    setPreviewImage(null);
    setScale(1);
  };

  return (
    <>
      <div id="write">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* 图片预览模态框 */}
      {previewImage && (
        <div
          className="image-preview-overlay"
          onClick={handleClose}
        >
          <div className="image-preview-controls">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              title="缩小"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <span className="image-preview-scale">{Math.round(scale * 100)}%</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              title="放大"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              title="关闭"
              className="image-preview-close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div
            className="image-preview-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              style={{ transform: `scale(${scale})` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MarkdownRenderer;
