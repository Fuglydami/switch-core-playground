# Upload

File upload component with drag-and-drop support (web) and progress tracking.

## Import

```tsx
// React (web)
import { Upload } from '@switch/react';

// React Native
import { Upload } from '@switch/react-native';
```

## Usage

```tsx
const [files, setFiles] = useState<UploadFile[]>([]);

<Upload
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  files={files}
  onFilesAdded={(newFiles) => handleUpload(newFiles)}  // web
  onPickFiles={() => pickDocument()}                    // RN
  onRemove={(id) => setFiles(f => f.filter(x => x.id !== id))}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | - | MIME types or extensions (e.g., `'image/*,.pdf'`) |
| `multiple` | `boolean` | `false` | Allow multiple files (web only) |
| `maxSize` | `number` | - | Max file size in bytes |
| `files` | `UploadFile[]` | `[]` | Current file list |
| `onFilesAdded` | `(files: File[]) => void` | - | Files selected handler (web) |
| `onPickFiles` | `() => void` | - | Picker trigger handler (RN) |
| `onRemove` | `(id: string) => void` | - | Remove file handler |
| `onRetry` | `(id: string) => void` | - | Retry failed upload handler |
| `disabled` | `boolean` | `false` | Disable upload |

### UploadFile

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique file identifier |
| `name` | `string` | File name |
| `size` | `number` | File size in bytes |
| `status` | `'idle' \| 'uploading' \| 'completed' \| 'failed'` | Upload status |
| `progress` | `number` | Upload progress (0-100) |
| `errorMessage` | `string` | Error message if failed |

## Examples

### Basic Upload (Web)

```tsx
function FileUploader() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handleFilesAdded = async (newFiles: File[]) => {
    const uploadFiles = newFiles.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      status: 'uploading' as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...uploadFiles]);

    // Upload logic...
  };

  return (
    <Upload
      accept=".pdf,.doc,.docx"
      maxSize={10 * 1024 * 1024}
      files={files}
      onFilesAdded={handleFilesAdded}
      onRemove={(id) => setFiles((f) => f.filter((x) => x.id !== id))}
    />
  );
}
```

### React Native with Document Picker

```tsx
import * as DocumentPicker from 'expo-document-picker';

function FileUploader() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handlePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
    });

    if (result.type === 'success') {
      setFiles((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: result.name,
          size: result.size ?? 0,
          status: 'idle',
        },
      ]);
    }
  };

  return (
    <Upload
      accept=".pdf,image/*"
      files={files}
      onPickFiles={handlePick}
      onRemove={(id) => setFiles((f) => f.filter((x) => x.id !== id))}
    />
  );
}
```

### With Progress Updates

```tsx
const updateProgress = (id: string, progress: number) => {
  setFiles((files) =>
    files.map((f) =>
      f.id === id ? { ...f, progress, status: 'uploading' } : f
    )
  );
};

const markComplete = (id: string) => {
  setFiles((files) =>
    files.map((f) =>
      f.id === id ? { ...f, status: 'completed', progress: 100 } : f
    )
  );
};

const markFailed = (id: string, error: string) => {
  setFiles((files) =>
    files.map((f) =>
      f.id === id ? { ...f, status: 'failed', errorMessage: error } : f
    )
  );
};
```

### Retry Failed Uploads

```tsx
<Upload
  files={files}
  onFilesAdded={handleFilesAdded}
  onRemove={handleRemove}
  onRetry={(id) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      // Reset status and retry upload
      setFiles((f) =>
        f.map((x) =>
          x.id === id ? { ...x, status: 'uploading', progress: 0 } : x
        )
      );
      retryUpload(file);
    }
  }}
/>
```

## Platform Differences

| Feature | Web | React Native |
|---------|-----|--------------|
| Drag and drop | Supported | Not applicable |
| File selection | Native file input | Consumer provides picker |
| Multiple files | Via `multiple` prop | Depends on picker used |

## Accessibility

- Drop zone is keyboard accessible (Enter/Space to open picker)
- Progress bar has `role="progressbar"` with value announcements
- Remove and retry buttons have descriptive labels
