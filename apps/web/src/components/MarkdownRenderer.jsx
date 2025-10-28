import { useMemo } from 'react'
import { marked } from 'marked'


export default function MarkdownRenderer({ md }) {
const html = useMemo(() => marked.parse(md || ''), [md])
return <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
}