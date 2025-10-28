// apps/web/src/components/MarkdownRenderer.jsx
import { useMemo } from "react";
import { marked } from "marked";          // v5+ ESM: 중괄호 import
import DOMPurify from "dompurify";

marked.setOptions({
  breaks: true,        // 줄바꿈 처리 (옵션)
  gfm: true,           // GitHub Flavored Markdown
});

export default function MarkdownRenderer({ markdown = "" }) {
  const html = useMemo(() => {
    const raw = marked.parse(markdown ?? "");
    return DOMPurify.sanitize(raw);
  }, [markdown]);

  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}