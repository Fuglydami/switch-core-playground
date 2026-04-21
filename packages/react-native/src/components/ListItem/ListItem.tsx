import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import type { ListItemBaseProps } from '@switch/types';
import { styles } from './ListItem.styles';

export interface ListItemProps extends ListItemBaseProps {}

function Avatar({ src, initials }: { src?: string; initials: string }) {
  if (src) {
    return <Image source={{ uri: src }} style={styles.avatarImage} accessibilityLabel={initials} />;
  }
  return (
    <Text style={styles.avatarText}>{initials.slice(0, 2).toUpperCase()}</Text>
  );
}

export function ListItem({
  variant = 'label',
  label,
  sublabel,
  avatar,
  leadingIcon,
  control,
  onPress,
}: ListItemProps) {
  const content = (
    <>
      {variant === 'label-avatar' && avatar && (
        <View style={styles.avatar}>
          <Avatar {...avatar} />
        </View>
      )}
      {variant === 'label-icon' && leadingIcon && (
        <View style={styles.icon}>{leadingIcon}</View>
      )}
      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        {sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}
      </View>
      {variant === 'label-control' && control && (
        <View style={styles.control}>{control}</View>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={styles.item}
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,66,95,0.08)' }}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.item}>{content}</View>;
}
