"use client";

import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';

// Custom components
import { CodeBlock } from './CodeBlock';
import { Heading } from './Heading';
import { Link } from './Link';

/**
 * MarkdownRenderer Component
 *
 * A secure, performant markdown renderer with full support for:
 * - GitHub Flavored Markdown (tables, task lists, strikethrough, autolinks)
 * - Code syntax highlighting (react-syntax-highlighter)
 * - Security (XSS prevention, URL sanitization via rehype-sanitize)
 * - Accessibility (semantic HTML, ARIA, heading anchors)
 * - Performance (memoization, optimized rendering)
 * - Custom styling (Tailwind classes, design system integration)
 */
export interface MarkdownRendererProps {
  /** The markdown content to render */
  content: string;
  /** Optional CSS class name for the wrapper */
  className?: string;
}

export const MarkdownRenderer = memo<MarkdownRendererProps>(({ content, className }) => {
  // Memoize remark plugins to prevent re-creation on each render
  const remarkPlugins = useMemo(() => [remarkGfm], []);

  // Memoize rehype plugins with proper security configuration
  const rehypePlugins: any[] = useMemo(() => [
    // Security: MUST come first to sanitize all HTML
    rehypeSanitize,
    // Code syntax highlighting
    rehypeHighlight,
    // Heading slug generation for anchors
    rehypeSlug,
    // External link security
    [rehypeExternalLinks, { rel: ['nofollow', 'noopener', 'noreferrer'], target: '_blank' }],
  ], []);

  // Memoize custom components to prevent re-renders
  const components = useMemo(() => ({
    code: CodeBlock,
    h1: (props: any) => <Heading level={1} {...props} />,
    h2: (props: any) => <Heading level={2} {...props} />,
    h3: (props: any) => <Heading level={3} {...props} />,
    h4: (props: any) => <Heading level={4} {...props} />,
    h5: (props: any) => <Heading level={5} {...props} />,
    h6: (props: any) => <Heading level={6} {...props} />,
    a: Link,
  }), []);

  // Handle empty or null content gracefully
  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';
