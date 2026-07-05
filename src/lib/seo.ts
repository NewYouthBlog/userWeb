import { removeMarkdown } from "@/lib/utils";

const DEFAULT_SITE_URL = "https://neotalks.org";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const SITE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_SITE_URL,
);

if (
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_BASE_URL &&
  SITE_URL !== DEFAULT_SITE_URL
) {
  throw new Error(
    `NEXT_PUBLIC_BASE_URL must be ${DEFAULT_SITE_URL} in production. Received ${process.env.NEXT_PUBLIC_BASE_URL}`,
  );
}

export const SITE_NAME = "新青年talks";
export const SITE_DESCRIPTION = "分享编程技术、生活感悟和个人项目的展示平台";
export const SITE_AUTHOR = "李星河";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function canonicalPath(path = "/") {
  const url = new URL(path, `${SITE_URL}/`);
  return `${url.pathname}${url.search}`;
}

export function summarizeMarkdown(content: string, maxLength = 160) {
  const summary = removeMarkdown(content).replace(/\s+/g, " ").trim();

  if (summary.length <= maxLength) {
    return summary;
  }

  return `${summary.slice(0, maxLength).trim()}...`;
}

