"use client";

import React from 'react';

/**
 * Link Component
 *
 * Renders links with proper security attributes for external links.
 * Automatically adds target="_blank" and rel attributes to external URLs.
 */
export const Link = ({ href, children, ...props }: any) => {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer nofollow' : undefined}
      className="text-[#0059FF] hover:underline no-underline"
      {...props}
    >
      {children}
      {isExternal && (
        <span className="inline-block ml-0.5 text-xs" aria-hidden="true">
          ↗
        </span>
      )}
    </a>
  );
};
