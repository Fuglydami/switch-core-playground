'use client';

import { useState } from 'react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  fileName?: string;
}

export function CodeBlock({ code, language = 'tsx', showLineNumbers = true, fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmedCode = code.trim();
  const lines = trimmedCode.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(trimmedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      {/* Editor header */}
      <div className={styles.header}>
        <div className={styles.windowControls}>
          <span className={styles.dot} data-color="red" />
          <span className={styles.dot} data-color="yellow" />
          <span className={styles.dot} data-color="green" />
        </div>
        {fileName && <span className={styles.fileName}>{fileName}</span>}
        <div className={styles.headerRight}>
          <span className={styles.language}>{language}</span>
          <button
            onClick={handleCopy}
            className={styles.copyButton}
            data-copied={copied}
          >
            {copied ? (
              <>
                <CheckIcon />
                Copied
              </>
            ) : (
              <>
                <CopyIcon />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className={styles.codeArea}>
        {showLineNumbers && (
          <div className={styles.lineNumbers} aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        )}
        <pre className={styles.pre}>
          <code className={styles.code}>{trimmedCode}</code>
        </pre>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}
