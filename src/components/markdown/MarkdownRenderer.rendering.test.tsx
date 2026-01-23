/**
 * Rendering Tests - Phase 3 (RED)
 * These tests verify GFM, Code highlighting, and basic markdown
 */
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MarkdownRenderer } from './MarkdownRenderer';

describe('MarkdownRenderer - GFM Features', () => {
  test('RENDER: Tables should render correctly', () => {
    const table = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
    `;
    const { container } = render(<MarkdownRenderer content={table} />);

    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelectorAll('th')).toHaveLength(2);
    expect(container.querySelectorAll('td')).toHaveLength(2);
  });

  test('RENDER: Task lists with checkboxes', () => {
    const tasks = `- [x] Completed
- [ ] Pending`;
    const { container } = render(<MarkdownRenderer content={tasks} />);

    const inputs = container.querySelectorAll('input[type="checkbox"]');
    expect(inputs).toHaveLength(2);
    // Note: rehype-sanitize might remove input attributes, so we check for presence
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  test('RENDER: Strikethrough text', () => {
    const strike = '~~deleted text~~ normal';
    const { container } = render(<MarkdownRenderer content={strike} />);

    expect(container.querySelector('del')).toBeInTheDocument();
    expect(container.textContent).toContain('deleted text');
  });

  test('RENDER: Autolinks from URLs', () => {
    const autolink = 'Visit www.example.com';
    const { container } = render(<MarkdownRenderer content={autolink} />);

    expect(container.querySelector('a')).toBeInTheDocument();
  });
});

describe('MarkdownRenderer - Code Syntax Highlighting', () => {
  test('RENDER: JavaScript code blocks', () => {
    const code = '```js\nconsole.log("Hello");\n```';
    const { container } = render(<MarkdownRenderer content={code} />);

    const pre = container.querySelector('pre');
    const codeEl = container.querySelector('code');
    expect(pre).toBeInTheDocument();
    expect(codeEl).toBeInTheDocument();
    // react-syntax-highlighter renders code, check that element exists
    expect(codeEl?.innerHTML.length).toBeGreaterThan(0);
  });

  test('RENDER: Python code blocks', () => {
    const code = '```python\nprint("Hello")\n```';
    const { container } = render(<MarkdownRenderer content={code} />);

    const codeEl = container.querySelector('code');
    expect(codeEl).toBeInTheDocument();
    // react-syntax-highlighter renders code
    expect(codeEl?.innerHTML.length).toBeGreaterThan(0);
  });

  test('RENDER: Inline code', () => {
    const inline = 'Use `const` for declarations';
    const { container } = render(<MarkdownRenderer content={inline} />);

    const codeEl = container.querySelector('code');
    expect(codeEl).toBeInTheDocument();
    expect(codeEl?.textContent).toBe('const');
  });

  test('RENDER: Code blocks without language', () => {
    const code = '```\nplain code\n```';
    const { container } = render(<MarkdownRenderer content={code} />);

    const pre = container.querySelector('pre');
    const codeEl = container.querySelector('code');
    expect(pre).toBeInTheDocument();
    expect(codeEl).toBeInTheDocument();
  });

  test('RENDER: Multiple code blocks', () => {
    const multi = '```js\nconst a = 1;\n```\n\n```py\nb = 2\n```';
    const { container } = render(<MarkdownRenderer content={multi} />);

    expect(container.querySelectorAll('pre')).toHaveLength(2);
  });
});

describe('MarkdownRenderer - Basic Markdown', () => {
  test('RENDER: Headings', () => {
    const headings = '# H1\n\n## H2\n\n### H3';
    const { container } = render(<MarkdownRenderer content={headings} />);

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  test('RENDER: Bold and italic', () => {
    const text = 'This is **bold** and this is *italic*';
    const { container } = render(<MarkdownRenderer content={text} />);

    expect(container.querySelector('strong')).toBeInTheDocument();
    expect(container.querySelector('em')).toBeInTheDocument();
  });

  test('RENDER: Links', () => {
    const link = '[Google](https://google.com)';
    const { getByRole } = render(<MarkdownRenderer content={link} />);

    const linkEl = getByRole('link');
    expect(linkEl).toBeInTheDocument();
    expect(linkEl.getAttribute('href')).toBe('https://google.com');
  });

  test('RENDER: Lists', () => {
    const list = '- Item 1\n- Item 2\n- Item 3';
    const { container } = render(<MarkdownRenderer content={list} />);

    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(ul?.children.length).toBe(3);
  });

  test('RENDER: Blockquotes', () => {
    const quote = '> This is a quote';
    const { container } = render(<MarkdownRenderer content={quote} />);

    expect(container.querySelector('blockquote')).toBeInTheDocument();
  });

  test('RENDER: Horizontal rules', () => {
    const hr = '---';
    const { container } = render(<MarkdownRenderer content={hr} />);

    expect(container.querySelector('hr')).toBeInTheDocument();
  });
});
