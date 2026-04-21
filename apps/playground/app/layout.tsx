import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import { TopNav } from '@/components/TopNav';
import { Sidebar } from '@/components/Sidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Switch Core',
    default: 'Switch Core',
  },
  description: 'Internal design system for the Switch frontend team.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TopNav />

          <div className={styles.shell}>
            <Sidebar />

            <div className={styles.contentArea}>
              <main className={styles.main}>
                {children}
              </main>

              <TableOfContents />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
