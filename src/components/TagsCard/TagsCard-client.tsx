"use client";

import { Tag } from "@/@types/tag";
import Link from "next/link";

interface TagsCardClientProps {
  data: Tag[];
}

export function TagsCard_client({ data }: TagsCardClientProps) {
  return (
    <div className="sidebar-panel">
      <header className="sidebar-panel__header">
        <h2 className="sidebar-panel__title">主题</h2>
        <p className="sidebar-panel__desc">按标签建立阅读坐标</p>
      </header>

      {data.length > 0 ? (
        <div className="sidebar-panel__tags" role="list">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/tags/${encodeURIComponent(item.name)}`}
              role="listitem"
              className="tag-chip"
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="sidebar-panel__empty">暂无标签</p>
      )}

      <Link href="/archive" className="sidebar-panel__link text-button">
        查看时间线
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
