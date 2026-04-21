import type React from 'react';

export type ListItemVariant = 'label' | 'label-avatar' | 'label-icon' | 'label-control';

export interface ListItemBaseProps {
  variant?: ListItemVariant;
  label: string;
  sublabel?: string;
  avatar?: { src?: string; initials: string };
  leadingIcon?: React.ReactNode;
  control?: React.ReactNode;
  onPress?: () => void;
}
