'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#1e293b' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'var(--switch-typography-font-family-mono)' }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            fontSize: 12,
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.15)',
            background: copied ? 'rgba(0,184,222,0.2)' : 'transparent',
            color: copied ? '#00b8de' : '#94a3b8',
            cursor: 'pointer',
            transition: 'all 150ms ease',
            fontFamily: 'var(--switch-typography-font-family-sans)',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0,
        padding: '16px',
        overflow: 'auto',
        fontFamily: 'var(--switch-typography-font-family-mono)',
        fontSize: 13,
        lineHeight: 1.6,
        color: '#e2e8f0',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
