import React, { useCallback, useEffect, useState, useRef, ReactNode } from "react";

interface AffixProps {
  offsetTop?: number; // 距离顶部的偏移量
  className?: string; // 自定义 CSS 类名
  style?: React.CSSProperties; // 自定义内联样式
  children: ReactNode; // 子组件
}

const Affix: React.FC<AffixProps> = ({
  offsetTop = 0,
  children,
  className = "",
  style = {},
}) => {
  const [isAffixed, setIsAffixed] = useState(false);
  const [affixWidth, setAffixWidth] = useState<number | null>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const affixRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!placeholderRef.current || !affixRef.current) return;

    const { top } = placeholderRef.current.getBoundingClientRect();
    setAffixWidth(placeholderRef.current.offsetWidth);
    setIsAffixed(top <= offsetTop);
  }, [offsetTop]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={placeholderRef} style={{ position: "relative" }}>
      {isAffixed ? (
        <div
          ref={affixRef}
          className={className}
          style={{
            ...style,
            position: "fixed",
            top: offsetTop,
            width: affixWidth || "auto",
            zIndex: 10,
          }}
        >
          {children}
        </div>
      ) : (
        <div ref={affixRef}>{children}</div>
      )}
    </div>
  );
};

export default Affix;
