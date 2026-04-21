import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Avatar' };

const WEB_CODE = `import { Avatar, AvatarGroup } from '@switch/react';

// Image avatar
<Avatar src="/path/to/photo.jpg" alt="Ada Okafor" size="medium" />

// Initials avatar with status indicator
<Avatar initials="OA" size="small" status="online" />
<Avatar initials="JD" size="small" status="offline" />
<Avatar initials="MK" size="small" status="busy" />

// Editable avatar
<Avatar initials="OA" size="large" editable onEdit={() => openFilePicker()} />

// Avatar group with overflow
<AvatarGroup
  avatars={users.map(u => ({ src: u.photo, initials: u.initials }))}
  size="small"
  max={4}
/>`;

const RN_CODE = `import { Avatar } from '@switch/react-native';

// Image avatar
<Avatar src="https://example.com/photo.jpg" alt="Ada Okafor" size="medium" />

// Initials avatar with status indicator
<Avatar initials="OA" size="small" status="online" />
<Avatar initials="JD" size="small" status="offline" />

// Editable avatar
<Avatar initials="OA" size="large" editable onEdit={() => openImagePicker()} />`;

const AVATAR_PROPS = [
  { name: 'src',       type: 'string',          default: '—',    description: 'Image URL — shows image when provided' },
  { name: 'initials',  type: 'string',          default: '—',    description: 'Up to 2 characters shown when no image' },
  { name: 'alt',       type: 'string',          default: '—',    description: 'Accessible label (falls back to initials)' },
  { name: 'size',      type: "'small' | 'medium' | 'large'", default: "'small'", description: 'Diameter: small (32px), medium (40px), large (56px)' },
  { name: 'status',    type: "'online' | 'offline' | 'busy'", default: '—', description: 'Status indicator dot: green (online), grey (offline), red (busy)' },
  { name: 'editable',  type: 'boolean',         default: 'false', description: 'Show edit overlay on hover' },
  { name: 'onEdit',    type: '() => void',      default: '—',    description: 'Called when edit overlay is clicked' },
  { name: 'bordered',  type: 'boolean',         default: 'false', description: 'Optional 2px white border for contrast' },
  { name: 'className', type: 'string',          default: '—',    description: 'Extra class on the avatar element (web only)' },
];

const GROUP_PROPS = [
  { name: 'avatars', type: 'Pick<AvatarProps, "src" | "initials" | "alt">[]', required: true, description: 'List of avatar data objects' },
  { name: 'size',    type: "'small' | 'medium' | 'large'", default: "'small'", description: 'Size applied to every avatar in the group' },
  { name: 'max',     type: 'number',        default: '4',  description: 'Maximum avatars shown before +N overflow indicator' },
];

export default function AvatarPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Avatar & Artwork</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Circular user identity element. Supports photo, initials, or a placeholder icon. Includes optional online/offline indicator, editable overlay, and AvatarGroup with overflow count.
        </p>
      </div>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Avatar Props</h2>
        <PropsTable props={AVATAR_PROPS} />
      </section>
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>AvatarGroup Props</h2>
        <PropsTable props={GROUP_PROPS} />
      </section>
    </article>
  );
}
