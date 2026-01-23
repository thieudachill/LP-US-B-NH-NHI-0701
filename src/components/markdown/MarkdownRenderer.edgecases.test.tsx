/**
 * Edge Case Tests - Phase 6 (RED)
 * These tests verify error handling and edge cases
 */
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MarkdownRenderer } from './MarkdownRenderer';

describe('MarkdownRenderer - Error Handling', () => {
  test('RECOVERS: Malformed markdown', () => {
    const malformed = '# **Unclosed bold\n\n```js\nunclosed code block';
    const { container } = render(<MarkdownRenderer content={malformed} />);

    // Should render something, not crash
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  test('RECOVERS: Empty input', () => {
    const { container } = render(<MarkdownRenderer content="" />);

    expect(container.textContent).toBe('');
  });

  test('RECOVERS: Whitespace only', () => {
    const { container } = render(<MarkdownRenderer content="   \n\n  " />);

    // Markdown processors normalize whitespace
    expect(container.textContent).toBeTruthy();
  });

  test('RECOVERS: Very long line', () => {
    const longLine = 'a'.repeat(10000);
    const { container } = render(<MarkdownRenderer content={longLine} />);

    expect(container.textContent?.length).toBeGreaterThan(0);
  });
});

describe('MarkdownRenderer - Special Characters', () => {
  test('RENDER: Unicode and emojis', () => {
    const unicode = 'Hello 🌍 世界 🚀';
    const { container } = render(<MarkdownRenderer content={unicode} />);

    expect(container.textContent).toBe(unicode);
  });

  test('RENDER: HTML entities', () => {
    const entities = '&copy; 2025 &mdash; Company &lt;tag&gt;';
    const { container } = render(<MarkdownRenderer content={entities} />);

    expect(container.innerHTML).toContain('©');
  });

  test('RENDER: Mixed special characters', () => {
    const mixed = '**Bold** with "quotes" and \'apostrophes\'';
    const { container } = render(<MarkdownRenderer content={mixed} />);

    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  test('RENDER: Nested formatting', () => {
    const nested = '***bold and italic***';
    const { container } = render(<MarkdownRenderer content={nested} />);

    expect(container.querySelector('strong')).toBeInTheDocument();
    expect(container.querySelector('em')).toBeInTheDocument();
  });
});

describe('MarkdownRenderer - Edge Cases', () => {
  test('RENDER: Only whitespace between elements', () => {
    const content = '# Title\n\n\n\n## Subtitle';
    const { container } = render(<MarkdownRenderer content={content} />);

    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  test('RENDER: Multiple consecutive links', () => {
    const content = '[1](url1) [2](url2) [3](url3)';
    const { container } = render(<MarkdownRenderer content={content} />);

    expect(container.querySelectorAll('a')).toHaveLength(3);
  });

  test('RENDER: Deeply nested lists', () => {
    const content = '- Item 1\n  - Nested 1\n    - Deep nested';
    const { container } = render(<MarkdownRenderer content={content} />);

    expect(container.querySelectorAll('li').length).toBeGreaterThan(0);
  });

  test('RENDER: Code blocks with special characters', () => {
    const content = '```js\nconst str = "Hello \'world\'";\n```';
    const { container } = render(<MarkdownRenderer content={content} />);

    const codeEl = container.querySelector('code');
    expect(codeEl).toBeInTheDocument();
    // react-syntax-highlighter renders code
    expect(codeEl?.innerHTML.length).toBeGreaterThan(0);
  });

  test('RENDER: Links with underscores', () => {
    const content = '[Test_Link](https://example.com/test_path)';
    const { getByRole } = render(<MarkdownRenderer content={content} />);

    const link = getByRole('link');
    expect(link).toBeInTheDocument();
  });

  test('RENDER: Escaped characters', () => {
    const content = '\\*not bold\\* \\[not link\\]';
    const { container } = render(<MarkdownRenderer content={content} />);

    expect(container.querySelector('strong')).toBeNull();
    expect(container.querySelector('a')).toBeNull();
  });
});
