'use client';

import { useState } from 'react';

type Platform = 'web' | 'react-native';

interface CodeTabsProps {
  web: string;
  reactNative?: string;
}

export function CodeTabs({ web, reactNative }: CodeTabsProps) {
  const [active, setActive] = useState<Platform>('web');

  const tabStyle = (platform: Platform) => ({
    padding: '6px 16px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'var(--switch-typography-font-family-sans)',
    background: active === platform ? '#fff' : 'transparent',
    color: active === platform ? 'var(--switch-color-semantic-primary)' : '#6b7280',
    boxShadow: active === platform ? 'var(--switch-shadow-sm)' : 'none',
    transition: 'all 150ms ease',
  });

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', background: '#1e293b' }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          display: 'flex',
          gap: 4,
          background: 'rgba(255,255,255,0.08)',
          padding: 4,
          borderRadius: 8,
        }}>
          <button type="button" onClick={() => setActive('web')} style={tabStyle('web')}>
            Web (React)
          </button>
          {reactNative && (
            <button type="button" onClick={() => setActive('react-native')} style={tabStyle('react-native')}>
              React Native
            </button>
          )}
        </div>
        <CopyButton code={active === 'web' ? web : (reactNative ?? '')} />
      </div>

      {/* Code */}
      <pre style={{
        margin: 0,
        padding: 16,
        overflow: 'auto',
        fontFamily: 'var(--switch-typography-font-family-mono)',
        fontSize: 13,
        lineHeight: 1.6,
        color: '#e2e8f0',
      }}>
        <code>{active === 'web' ? web : reactNative}</code>
      </pre>
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        fontSize: 12,
        padding: '4px 10px',
        borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.15)',
        background: copied ? 'rgba(0,184,222,0.2)' : 'transparent',
        color: copied ? '#00b8de' : '#94a3b8',
        cursor: 'pointer',
        fontFamily: 'var(--switch-typography-font-family-sans)',
        transition: 'all 150ms ease',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
