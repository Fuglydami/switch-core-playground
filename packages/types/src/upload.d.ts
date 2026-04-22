export type UploadStatus = 'idle' | 'uploading' | 'completed' | 'failed';
export interface UploadFileBase {
    id: string;
    name: string;
    size: number;
    /** Upload progress 0-100 (used when status is 'uploading') */
    progress?: number;
    status: UploadStatus;
    errorMessage?: string;
}
export interface UploadBaseProps {
    /** Accept MIME types or extensions, e.g. 'image/*,.pdf' */
    accept?: string;
    multiple?: boolean;
    /** Max file size in bytes */
    maxSize?: number;
    disabled?: boolean;
}
//# sourceMappingURL=upload.d.ts.map