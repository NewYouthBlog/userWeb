"use client";

import React, { useMemo, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown-indigo.css";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

function CopyablePre({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getNodeText(children));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <pre>
      {children}
      <button
        type="button"
        className={`copy-code-button${copied ? " copied" : ""}`}
        title="复制代码"
        onClick={handleCopy}
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
    </pre>
  );
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const components = useMemo<Components>(
    () => ({
      pre({ children }) {
        return <CopyablePre>{children}</CopyablePre>;
      },
      img({ src, alt }) {
        if (!src || typeof src !== "string") {
          return null;
        }

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ""}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPreviewImage(src);
              setScale(1);
            }}
          />
        );
      },
    }),
    [],
  );

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
          components={components}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
