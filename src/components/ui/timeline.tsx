"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
}

function TimelineSection({ item, index }: { item: TimelineEntry; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "60px 0px",
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="archive-issue"
    >
      <header className="archive-issue__header">
        <span className="archive-issue__marker" aria-hidden="true" />
        <h2 className="archive-issue__title">{item.title}</h2>
      </header>
      {item.content}
    </motion.section>
  );
}

export function Timeline({ data }: TimelineProps) {
  return (
    <div className="page-shell archive-page">
      <header className="archive-page__header">
        <span className="kicker">Archive</span>
        <h1 className="section-heading">时间线</h1>
        <p className="section-lead archive-page__lead">
          按月份归档的文章索引。每一期都是一段在数字荒原中留下的脚印。
        </p>
      </header>

      <div className="archive-timeline">
        {data.map((item, index) => (
          <TimelineSection key={item.title} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
