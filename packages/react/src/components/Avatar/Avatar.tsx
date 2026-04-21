import styles from './Avatar.module.css';

export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarStatus = 'online' | 'offline' | 'busy';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Initials shown when no image (max 2 letters) */
  initials?: string;
  alt?: string;
  /** Size: small (32px), medium (40px), large (56px) */
  size?: AvatarSize;
  /** Status indicator: online (green), offline (gray), busy (red) */
  status?: AvatarStatus;
  /** Show edit overlay button */
  editable?: boolean;
  onEdit?: () => void;
  /** Optional 2px white border for contrast */
  bordered?: boolean;
  className?: string;
}

function PersonIcon() {
  return (
    <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Avatar({
  src,
  initials,
  alt,
  size = 'small',
  status,
  editable,
  onEdit,
  bordered,
  className,
}: AvatarProps) {
  const sizeClass = styles[size];
  const classes = [
    styles.avatar,
    sizeClass,
    bordered && styles.bordered,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      aria-label={alt ?? initials}
    >
      {src ? (
        <img src={src} alt={alt ?? initials ?? ''} className={styles.image} />
      ) : initials ? (
        <span className={styles.initials} aria-hidden="true">
          {initials.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <span className={styles.placeholder} aria-hidden="true">
          <PersonIcon />
        </span>
      )}

      {status && (
        <span
          className={[styles.indicator, styles[status]].join(' ')}
          aria-label={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      )}

      {editable && (
        <button
          type="button"
          className={styles.editOverlay}
          onClick={onEdit}
          aria-label="Edit avatar"
        >
          <CameraIcon />
        </button>
      )}
    </span>
  );
}

// ── AvatarGroup ────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Pick<AvatarProps, 'src' | 'initials' | 'alt'>[];
  /** Size: small (32px), medium (40px), large (56px) */
  size?: AvatarSize;
  /** Max avatars shown before +N overflow */
  max?: number;
}

export function AvatarGroup({ avatars, size = 'small', max = 4 }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <span className={styles.group}>
      {visible.map((a, i) => (
        <Avatar key={i} {...a} size={size} bordered className={styles.groupItem} />
      ))}
      {overflow > 0 && (
        <span className={[styles.avatar, styles[size], styles.overflow].join(' ')}>
          +{overflow}
        </span>
      )}
    </span>
  );
}
