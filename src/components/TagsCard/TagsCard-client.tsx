"use client";

import { Tag } from "@/@types/tag";
import Link from "next/link";

interface TagsCardClientProps {
  data: Tag[];
}

export function TagsCard_client({ data }: TagsCardClientProps) {
  return (
    <aside className="sidebar-panel">
      <h2 className="sidebar-panel__title">热门主题</h2>
      <p className="sidebar-panel__desc">
        用标签给文章建立坐标，找到你今天需要的补给。
      </p>

      <div className="sidebar-panel__tags" role="list">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/tags/${encodeURIComponent(item.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
          >
            <span className="tag-chip">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
