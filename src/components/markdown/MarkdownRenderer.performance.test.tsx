/**
 * Performance Tests - Phase 4 (RED)
 * These tests verify rendering performance
 */
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MarkdownRenderer } from './MarkdownRenderer';

describe('MarkdownRenderer - Performance', () => {
  test('FAST: Small document renders quickly', () => {
    const small = '# Title\n\nParagraph with **bold** text.';
    const start = performance.now();
    render(<MarkdownRenderer content={small} />);
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(100);
  });

  test('FAST: Medium document renders in reasonable time', () => {
    const medium = Array(50).fill('## Heading\n\nParagraph with content and **bold** text.').join('\n\n');
    const start = performance.now();
    render(<MarkdownRenderer content={medium} />);
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(500);
  });

  test('RENDER: Large document does not crash', () => {
    const large = Array(100).fill('## Heading\n\nParagraph with content.').join('\n\n');
    const { container } = render(<MarkdownRenderer content={large} />);

    // Should render something
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  test('OPTIMIZED: Empty content does not crash', () => {
    const { container } = render(<MarkdownRenderer content="" />);

    expect(container.textContent).toBe('');
  });
});

describe('MarkdownRenderer - Bundle Impact', () => {
  test('RENDER: Code highlighting works', () => {
    const code = '```javascript\nconst x = 1;\n```';
    const { container } = render(<MarkdownRenderer content={code} />);

    const codeEl = container.querySelector('code');
    expect(codeEl).toBeInTheDocument();
  });
});
