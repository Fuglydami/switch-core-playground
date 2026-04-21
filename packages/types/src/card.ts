export type CardShadow = 'none' | 'base' | 'small' | 'medium';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardBaseProps {
  /** Optional shadow depth */
  shadow?: CardShadow;
  padding?: CardPadding;
  /** Make the entire card a clickable element */
  onPress?: () => void;
}

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardBaseProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
  /** "View Details" or similar CTA label */
  action?: string;
  onAction?: () => void;
}
