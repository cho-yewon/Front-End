import React from "react";
import { marked } from "marked";

marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function MarkdownRenderer({ md }) {
  if (!md) return null;

  const html = marked.parse(md);

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
