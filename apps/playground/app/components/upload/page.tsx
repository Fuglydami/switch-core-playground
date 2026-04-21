import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Upload' };

const WEB_CODE = `import { Upload } from '@switch/react';
import { useState } from 'react';

function Example() {
  const [files, setFiles] = useState([]);

  const handleAdded = (newFiles) => {
    const entries = newFiles.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      status: 'uploading',
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...entries]);
    // kick off your upload logic here…
  };

  return (
    <Upload
      accept="image/*, .pdf"
      multiple
      maxSize={10 * 1024 * 1024}
      files={files}
      onFilesAdded={handleAdded}
      onRemove={(id) => setFiles((f) => f.filter((x) => x.id !== id))}
      onRetry={(id) => retryUpload(id)}
    />
  );
}`;

const PROPS = [
  { name: 'accept',        type: 'string',           default: '—',     description: 'MIME types or extensions accepted (passed to file input)' },
  { name: 'multiple',      type: 'boolean',          default: 'false', description: 'Allow selecting multiple files at once' },
  { name: 'maxSize',       type: 'number',           default: '—',     description: 'Maximum file size in bytes; larger files are filtered out' },
  { name: 'files',         type: 'UploadFile[]',     default: '[]',    description: 'Current file list (controlled)' },
  { name: 'onFilesAdded',  type: '(files: File[]) => void', default: '—', description: 'Called with validated File objects when the user picks or drops files' },
  { name: 'onRemove',      type: '(id: string) => void',    default: '—', description: 'Called when the ✕ button is clicked' },
  { name: 'onRetry',       type: '(id: string) => void',    default: '—', description: 'Called when the Retry link is clicked on a failed file' },
  { name: 'disabled',      type: 'boolean',          default: 'false', description: 'Disables the drop zone and file picker' },
  { name: 'className',     type: 'string',           default: '—',     description: 'Extra class applied to the outer wrapper' },
];

const FILE_PROPS = [
  { name: 'id',           type: 'string',     required: true,  description: 'Unique identifier for this file entry' },
  { name: 'name',         type: 'string',     required: true,  description: 'File name shown in the list' },
  { name: 'size',         type: 'number',     required: true,  description: 'File size in bytes (formatted automatically)' },
  { name: 'status',       type: '"idle" | "uploading" | "completed" | "failed"', required: true, description: 'Current upload status — controls icon, border, and actions' },
  { name: 'progress',     type: 'number',     default: '—',    description: 'Upload progress 0–100 (shown as progress bar when status is "uploading")' },
  { name: 'errorMessage', type: 'string',     default: '—',    description: 'Error detail shown below the filename when status is "failed"' },
];

export default function UploadPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Upload</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Drag-and-drop or click-to-browse file upload zone with a managed file list. Each file independently tracks upload progress, completion, and failure.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Upload Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>UploadFile Shape</h2>
        <PropsTable props={FILE_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>The drop zone is a <code>role="button"</code> element reachable by keyboard (<kbd>Enter</kbd> / <kbd>Space</kbd> opens the file picker).</li>
          <li>The hidden <code>&lt;input type="file"&gt;</code> is aria-hidden so screen readers interact with the styled region instead.</li>
          <li>Progress bars use <code>role="progressbar"</code> with <code>aria-valuenow</code>, <code>aria-valuemin</code>, and <code>aria-valuemax</code>.</li>
          <li>Remove and Retry buttons have descriptive <code>aria-label</code> values including the file name.</li>
        </ul>
      </section>
    </article>
  );
}
