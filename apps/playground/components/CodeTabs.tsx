'use client';

import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import styles from './CodeTabs.module.css';

type Platform = 'web' | 'react-native';

interface CodeTabsProps {
  web: string;
  reactNative?: string;
}

export function CodeTabs({ web, reactNative }: CodeTabsProps) {
  const [active, setActive] = useState<Platform>('web');

  return (
    <div className={styles.container}>
      {/* Platform switcher tabs */}
      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => setActive('web')}
            className={styles.tab}
            data-active={active === 'web'}
          >
            Web (React)
          </button>
          {reactNative && (
            <button
              type="button"
              onClick={() => setActive('react-native')}
              className={styles.tab}
              data-active={active === 'react-native'}
            >
              React Native
            </button>
          )}
        </div>
      </div>

      {/* Code block */}
      <CodeBlock
        code={active === 'web' ? web : (reactNative ?? '')}
        language="tsx"
        fileName={active === 'web' ? 'Example.tsx' : 'Example.native.tsx'}
      />
    </div>
  );
}
