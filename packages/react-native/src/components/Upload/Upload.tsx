import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './Upload.styles';

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
  /** Accept MIME types or extensions hint (display only in RN) */
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes (display hint only) */
  maxSize?: number;
  files?: UploadFile[];
  /** Called when the upload zone is pressed — consumer provides picker implementation */
  onPickFiles?: () => void;
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadCloudIcon() {
  return (
    <Text style={{ fontSize: 32, color: '#5F738C' }}>{'\u2191'}</Text>
  );
}

function FileIcon() {
  return (
    <Text style={{ fontSize: 16, color: '#5F738C' }}>{'\u2B1B'}</Text>
  );
}

function CheckIcon() {
  return (
    <Text style={{ fontSize: 14, color: '#10B981' }}>{'\u2713'}</Text>
  );
}

function ErrorIcon() {
  return (
    <Text style={{ fontSize: 14, color: '#E53935' }}>{'\u26A0'}</Text>
  );
}

function CloseIcon() {
  return (
    <Text style={{ fontSize: 12, color: '#5F738C' }}>{'\u2715'}</Text>
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
    <View
      style={[
        styles.fileRow,
        isFailed && styles.fileRowFailed,
        isCompleted && styles.fileRowCompleted,
      ]}
    >
      <View style={styles.fileIcon}>
        {isCompleted ? (
          <CheckIcon />
        ) : isFailed ? (
          <ErrorIcon />
        ) : (
          <FileIcon />
        )}
      </View>

      <View style={styles.fileMeta}>
        <View style={styles.fileNameRow}>
          <Text style={styles.fileName} numberOfLines={1}>
            {file.name}
          </Text>
          {!isFailed && (
            <Text style={styles.fileSize}>{formatBytes(file.size)}</Text>
          )}
        </View>

        {isFailed && file.errorMessage && (
          <Text style={styles.fileError}>{file.errorMessage}</Text>
        )}

        {isUploading && (
          <View
            style={styles.progressTrack}
            accessibilityRole="progressbar"
            accessibilityValue={{
              min: 0,
              max: 100,
              now: file.progress ?? 0,
            }}
          >
            <View
              style={[styles.progressBar, { width: `${file.progress ?? 0}%` }]}
            />
          </View>
        )}

        {isUploading && (
          <Text style={styles.fileSize}>{file.progress ?? 0}%</Text>
        )}
      </View>

      <View style={styles.fileActions}>
        {isFailed && onRetry && (
          <Pressable
            style={styles.retryBtn}
            onPress={() => onRetry(file.id)}
            accessibilityRole="button"
            accessibilityLabel={`Retry uploading ${file.name}`}
          >
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        )}
        {onRemove && (
          <Pressable
            style={({ pressed }) => [
              styles.removeBtn,
              pressed && styles.removeBtnPressed,
            ]}
            onPress={() => onRemove(file.id)}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${file.name}`}
          >
            <CloseIcon />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function Upload({
  accept,
  maxSize,
  files = [],
  onPickFiles,
  onRemove,
  onRetry,
  disabled = false,
}: UploadProps) {
  const hintParts: string[] = [];
  if (accept) hintParts.push(accept.replace(/,/g, ', '));
  if (maxSize) hintParts.push(`max ${formatBytes(maxSize)}`);
  const hint = hintParts.join(' · ');

  return (
    <View style={styles.wrapper}>
      {/* Drop zone / picker trigger */}
      <Pressable
        style={({ pressed }) => [
          styles.dropZone,
          pressed && !disabled && styles.dropZonePressed,
          disabled && styles.dropZoneDisabled,
        ]}
        onPress={disabled ? undefined : onPickFiles}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Upload files"
        accessibilityState={{ disabled }}
      >
        <View style={styles.uploadIcon}>
          <UploadCloudIcon />
        </View>
        <Text style={styles.dropText}>
          <Text style={styles.dropTextBold}>Tap to upload</Text>
        </Text>
        {hint ? <Text style={styles.dropHint}>{hint}</Text> : null}
      </Pressable>

      {/* File list */}
      {files.length > 0 && (
        <View style={styles.fileList}>
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              onRemove={onRemove}
              onRetry={onRetry}
            />
          ))}
        </View>
      )}
    </View>
  );
}
