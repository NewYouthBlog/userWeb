import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeMarkdown(text: string) {
  return text
    .replace(/#+\s/g, "") // Remove headers
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1") // Remove links
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "") // Remove images
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1") // Remove inline code
    .replace(/^\s{0,3}>\s?/gm, "") // Remove blockquotes
    .replace(/-\s/g, "") // Remove list items
    .replace(/\n/g, " "); // Replace newlines with spaces
}
