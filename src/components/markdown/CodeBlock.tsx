"use client";

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * CodeBlock Component
 *
 * Renders code blocks with syntax highlighting using react-syntax-highlighter.
 * Falls back to simple <code> tag for inline code or when language is not detected.
 */
export const CodeBlock = ({ children, className, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  if (match && language) {
    return (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        className="rounded-lg"
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  }

  return (
    <code
      className="bg-gray-100 text-[#0059FF] px-1 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  );
};
