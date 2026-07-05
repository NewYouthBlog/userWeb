"use client";

import { useEffect, useState } from "react";

function useRunningTime(startIso: string) {
  const [runningTime, setRunningTime] = useState("");

  useEffect(() => {
    const startDate = new Date(startIso);

    const update = () => {
      const diff = Date.now() - startDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRunningTime(`${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [startIso]);

  return runningTime;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const runningTime = useRunningTime("2025-12-01T00:00:00");

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__line">
          <strong>新青年talks</strong>
          <span className="site-footer__sep" aria-hidden="true" />
          <span>© {currentYear}</span>
        </p>
        <p className="site-footer__line site-footer__line--muted">
          在数字荒原里，已守住这处庇护所 {runningTime}
        </p>
      </div>
    </footer>
  );
}
