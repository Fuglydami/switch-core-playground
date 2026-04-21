import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { styles, colors } from './Avatar.styles';

export type AvatarSize = 40 | 56 | 80;

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Initials shown when no image */
  initials?: string;
  alt?: string;
  size?: AvatarSize;
  /** Show online indicator dot */
  online?: boolean;
  /** Show edit overlay button */
  editable?: boolean;
  onEdit?: () => void;
  testID?: string;
}

function PersonIcon({ size }: { size: number }) {
  const iconSize = size * 0.6;
  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke={colors.greyDark}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={7} r={4} stroke={colors.greyDark} strokeWidth={1.5} />
    </Svg>
  );
}

function EditIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z"
        stroke={colors.pryBlue}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const sizeStyles = { 40: styles.size40, 56: styles.size56, 80: styles.size80 };
const initialsSizeStyles = { 40: styles.initialsSize40, 56: styles.initialsSize56, 80: styles.initialsSize80 };
const indicatorSizeStyles = { 40: styles.indicatorSize40, 56: styles.indicatorSize56, 80: styles.indicatorSize80 };
const editOverlaySizeStyles = { 40: styles.editOverlaySize40, 56: styles.editOverlaySize56, 80: styles.editOverlaySize80 };

export const Avatar: React.FC<AvatarProps> = ({
  src,
  initials,
  alt,
  size = 40,
  online,
  editable,
  onEdit,
  testID,
}) => {
  const sizeStyle = sizeStyles[size];
  const initialsSizeStyle = initialsSizeStyles[size];
  const indicatorSizeStyle = indicatorSizeStyles[size];
  const editOverlaySizeStyle = editOverlaySizeStyles[size];

  return (
    <View
      style={[styles.avatar, sizeStyle]}
      accessibilityLabel={alt ?? initials}
      accessibilityRole="image"
      testID={testID}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          style={styles.image}
          accessibilityLabel={alt ?? initials ?? ''}
        />
      ) : initials ? (
        <Text style={[styles.initials, initialsSizeStyle]}>
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      ) : (
        <View style={styles.placeholder}>
          <PersonIcon size={size} />
        </View>
      )}

      {online !== undefined && (
        <View
          style={[
            styles.indicator,
            indicatorSizeStyle,
            online ? styles.online : styles.offline,
          ]}
          accessibilityLabel={online ? 'Online' : 'Offline'}
        />
      )}

      {editable && (
        <Pressable
          style={[styles.editOverlay, editOverlaySizeStyle]}
          onPress={onEdit}
          accessibilityLabel="Edit avatar"
          accessibilityRole="button"
        >
          <EditIcon />
        </Pressable>
      )}
    </View>
  );
};

Avatar.displayName = 'Avatar';

// ── AvatarGroup ────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Pick<AvatarProps, 'src' | 'initials' | 'alt'>[];
  size?: AvatarSize;
  /** Max avatars shown before +N overflow */
  max?: number;
  testID?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 40,
  max = 4,
  testID,
}) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const sizeStyle = sizeStyles[size];
  const initialsSizeStyle = initialsSizeStyles[size];

  return (
    <View style={styles.group} testID={testID}>
      {visible.map((a, i) => (
        <View
          key={i}
          style={[
            styles.avatar,
            sizeStyle,
            styles.groupItem,
            i === 0 && styles.groupItemFirst,
          ]}
        >
          {a.src ? (
            <Image
              source={{ uri: a.src }}
              style={styles.image}
              accessibilityLabel={a.alt ?? a.initials ?? ''}
            />
          ) : a.initials ? (
            <Text style={[styles.initials, initialsSizeStyle]}>
              {a.initials.slice(0, 2).toUpperCase()}
            </Text>
          ) : (
            <View style={styles.placeholder}>
              <PersonIcon size={size} />
            </View>
          )}
        </View>
      ))}
      {overflow > 0 && (
        <View style={[styles.avatar, sizeStyle, styles.overflow]}>
          <Text style={styles.overflowText}>+{overflow}</Text>
        </View>
      )}
    </View>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
