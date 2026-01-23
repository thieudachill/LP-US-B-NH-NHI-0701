/**
 * Accessibility Tests - Phase 5 (RED)
 * These tests verify accessibility features
 */
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MarkdownRenderer } from './MarkdownRenderer';

describe('MarkdownRenderer - Accessibility', () => {
  test('A11Y: Proper heading hierarchy', () => {
    const headings = '# H1\n\n## H2\n\n### H3';
    const { container } = render(<MarkdownRenderer content={headings} />);

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  test('A11Y: Links have accessible names', () => {
    const link = '[Click here](https://example.com)';
    const { getByRole } = render(<MarkdownRenderer content={link} />);

    const linkEl = getByRole('link');
    // Our custom Link component adds an external icon for external links
    expect(linkEl.textContent).toContain('Click here');
  });

  test('A11Y: Links have href attributes', () => {
    const link = '[Example](https://example.com)';
    const { getByRole } = render(<MarkdownRenderer content={link} />);

    const linkEl = getByRole('link');
    expect(linkEl).toHaveAttribute('href');
  });

  test('A11Y: Code blocks are in pre tags', () => {
    const code = '```js\nconst x = 1;\n```';
    const { container } = render(<MarkdownRenderer content={code} />);

    const pre = container.querySelector('pre');
    const codeEl = container.querySelector('code');
    expect(pre).toBeInTheDocument();
    expect(codeEl).toBeInTheDocument();
  });

  test('A11Y: Tables have proper structure', () => {
    const table = `
| Header 1 | Header 2 |
|----------|----------|
| Data 1   | Data 2   |
    `;
    const { container } = render(<MarkdownRenderer content={table} />);

    const tableEl = container.querySelector('table');
    expect(tableEl).toBeInTheDocument();
    expect(container.querySelectorAll('th')).toHaveLength(2);
  });

  test('A11Y: Lists have proper semantic markup', () => {
    const list = '- Item 1\n- Item 2';
    const { container } = render(<MarkdownRenderer content={list} />);

    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(ul?.children.length).toBeGreaterThan(0);
  });

  test('A11Y: Blockquotes are semantic', () => {
    const quote = '> This is a quote';
    const { container } = render(<MarkdownRenderer content={quote} />);

    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });
});
