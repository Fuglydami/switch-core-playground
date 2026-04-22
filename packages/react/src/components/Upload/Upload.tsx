import React from 'react';
import styles from './Upload.module.css';

export type UploadStatus = 'idle' | 'uploading' | 'completed' | 'failed';

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  /** Upload progress 0-100 (used when status is 'uploading') */
  progress?: number;
  status: UploadStatus;
  errorMessage?: string;
}

export interface UploadProps {
  /** Accept MIME types or extensions, e.g. 'image/*,.pdf' */
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  files?: UploadFile[];
  onFilesAdded?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
  disabled?: boolean;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11 2H5a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V7l-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 2v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}



function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Upload arrow */}
      <path
        d="M12 16V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Arrow head */}
      <path
        d="M7 9l5-5 5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tray */}
      <path
        d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileRow({
  file,
  onRemove,
  onRetry,
}: {
  file: UploadFile;
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
}) {
  const isUploading = file.status === 'uploading';
  const isCompleted = file.status === 'completed';
  const isFailed = file.status === 'failed';

  return (
    <div className={[styles.fileRow, styles[file.status]].filter(Boolean).join(' ')}>
      <span className={[styles.fileIcon, isFailed ? styles.fileIconError : isCompleted ? styles.fileIconSuccess : ''].filter(Boolean).join(' ')}>
        {isCompleted ? <CheckIcon /> : isFailed ? <ErrorIcon /> : <FileIcon />}
      </span>

      <div className={styles.fileMeta}>
        <div className={styles.fileNameRow}>
          <span className={styles.fileName}>{file.name}</span>
          {!isFailed && (
            <span className={styles.fileSize}>{formatBytes(file.size)}</span>
          )}
        </div>

        {isFailed && file.errorMessage && (
          <span className={styles.fileError}>{file.errorMessage}</span>
        )}

        {isUploading && (
          <div className={styles.progressTrack} role="progressbar" aria-valuenow={file.progress ?? 0} aria-valuemin={0} aria-valuemax={100}>
            <div className={styles.progressBar} style={{ width: `${file.progress ?? 0}%` }} />
          </div>
        )}

        {isUploading && (
          <span className={styles.fileSize}>{file.progress ?? 0}%</span>
        )}
      </div>

      <div className={styles.fileActions}>
        {isFailed && onRetry && (
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => onRetry(file.id)}
            aria-label={`Retry uploading ${file.name}`}
          >
            Retry
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemove(file.id)}
            aria-label={`Remove ${file.name}`}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export function Upload({
  accept,
  multiple = false,
  maxSize,
  files = [],
  onFilesAdded,
  onRemove,
  onRetry,
  disabled = false,
  className,
}: UploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList) => {
    const valid = Array.from(fileList).filter((f) => {
      if (maxSize && f.size > maxSize) return false;
      return true;
    });
    if (valid.length) onFilesAdded?.(valid);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = '';
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {/* Drop zone */}
      <div
        className={[
          styles.dropZone,
          isDragging ? styles.dragging : '',
          disabled ? styles.disabledZone : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files — click or drag and drop"
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onInputChange}
          className={styles.hiddenInput}
          aria-hidden="true"
          tabIndex={-1}
        />

        <span className={styles.uploadIcon}>
          <UploadIcon />
        </span>
        <p className={styles.dropText}>
          <strong>Click to upload</strong> or drag and drop
        </p>
        {accept && (
          <p className={styles.dropHint}>
            {accept.replace(/,/g, ', ')}
            {maxSize ? ` · max ${formatBytes(maxSize)}` : ''}
          </p>
        )}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              onRemove={onRemove}
              onRetry={onRetry}
            />
          ))}
        </div>
      )}
    </div>
  );
}
