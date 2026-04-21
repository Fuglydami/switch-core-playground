import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles } from './SideNav.styles';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: NavItem[];
}

export interface SideNavProps {
  items: NavItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** Logo / brand slot at the top */
  logo?: React.ReactNode;
  /** Footer slot at the bottom */
  footer?: React.ReactNode;
  /** 'full' shows label + icon; 'compact' shows icon only */
  variant?: 'full' | 'compact';
  /** Light (default) or dark background */
  theme?: 'light' | 'dark';
}

function NavItemRow({
  item,
  activeId,
  onNavigate,
  variant,
  theme,
  depth = 0,
}: {
  item: NavItem;
  activeId?: string;
  onNavigate?: (id: string) => void;
  variant: 'full' | 'compact';
  theme: 'light' | 'dark';
  depth?: number;
}) {
  const isActive = item.id === activeId;
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = React.useState(
    hasChildren ? item.children!.some((c) => c.id === activeId) : false
  );

  const handlePress = () => {
    if (item.disabled) return;
    if (hasChildren) {
      setExpanded((e) => !e);
    }
    onNavigate?.(item.id);
  };

  const isDark = theme === 'dark';

  return (
    <View>
      <Pressable
        onPress={handlePress}
        disabled={item.disabled}
        style={({ pressed }) => [
          styles.navItem,
          depth > 0 && styles.nested,
          isActive && (isDark ? styles.activeDark : styles.activeLight),
          pressed && styles.pressed,
          item.disabled && styles.disabled,
        ]}
        accessibilityRole="button"
        accessibilityState={{
          selected: isActive,
          disabled: item.disabled,
          expanded: hasChildren ? expanded : undefined,
        }}
        accessibilityLabel={item.label}
      >
        {item.icon && <View style={styles.navIcon}>{item.icon}</View>}
        {variant === 'full' && (
          <Text
            style={[
              styles.navLabel,
              isDark && styles.navLabelDark,
              isActive && styles.navLabelActive,
              item.disabled && styles.navLabelDisabled,
            ]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        )}
        {variant === 'full' && item.badge !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        {variant === 'full' && hasChildren && (
          <Text style={[styles.chevron, expanded && styles.chevronOpen]}>
            {'\u2304'}
          </Text>
        )}
      </Pressable>

      {hasChildren && expanded && variant === 'full' && (
        <View style={styles.childList}>
          {item.children!.map((child) => (
            <NavItemRow
              key={child.id}
              item={child}
              activeId={activeId}
              onNavigate={onNavigate}
              variant={variant}
              theme={theme}
              depth={depth + 1}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export function SideNav({
  items,
  activeId,
  onNavigate,
  logo,
  footer,
  variant = 'full',
  theme = 'light',
}: SideNavProps) {
  const isDark = theme === 'dark';

  return (
    <View style={[styles.nav, isDark && styles.navDark]}>
      {logo && <View style={styles.logoSlot}>{logo}</View>}

      <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            activeId={activeId}
            onNavigate={onNavigate}
            variant={variant}
            theme={theme}
          />
        ))}
      </ScrollView>

      {footer && <View style={styles.footerSlot}>{footer}</View>}
    </View>
  );
}
