"use client";

import React from 'react';

/**
 * Heading Component
 *
 * Renders headings with automatic slug generation for deep linking.
 * Includes anchor link functionality that appears on hover.
 */
export const Heading = ({ level, children, ...props }: any) => {
  // Generate slug from heading text
  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const headingText = React.Children.toArray(children).join('');
  const slug = generateSlug(headingText);

  const baseClasses: Record<string, string> = {
    h1: 'text-3xl font-bold mt-8 mb-4 text-gray-900',
    h2: 'text-2xl font-bold mt-6 mb-3 text-gray-900',
    h3: 'text-xl font-semibold mt-4 mb-2 text-gray-900',
    h4: 'text-lg font-semibold mt-3 mb-2 text-gray-900',
    h5: 'text-base font-semibold mt-2 mb-1 text-gray-900',
    h6: 'text-sm font-semibold mt-2 mb-1 text-gray-900',
  };

  const classes = baseClasses[`h${level}`] || '';

  // Render the appropriate heading tag
  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <HeadingTag id={slug} className={`${classes} group scroll-mt-4 relative`} {...props}>
      {/* Heading text - always visible */}
      <span className="inline-block">{children}</span>
      {/* Anchor icon - only visible on hover */}
      <a
        href={`#${slug}`}
        className="anchor-link inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity no-underline text-gray-400 hover:text-blue-500"
        aria-label={`Link to ${headingText}`}
      >
        #
      </a>
    </HeadingTag>
  );
};
