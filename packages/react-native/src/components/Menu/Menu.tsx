import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { styles } from './Menu.styles';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onPress?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  /** Element that triggers the menu */
  trigger: React.ReactElement;
  /** Called when menu opens/closes */
  onOpenChange?: (open: boolean) => void;
}

export function Menu({ items, trigger, onOpenChange }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const [layout, setLayout] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = React.useRef<View>(null);

  const openMenu = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
      setOpen(true);
      onOpenChange?.(true);
    });
  };

  const closeMenu = () => {
    setOpen(false);
    onOpenChange?.(false);
  };

  const handleItemPress = (item: MenuItem) => {
    if (item.disabled) return;
    item.onPress?.();
    closeMenu();
  };

  return (
    <>
      <Pressable ref={triggerRef} onPress={openMenu}>
        {trigger}
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu}>
          <View
            style={[
              styles.menu,
              {
                top: layout.y + layout.height + 4,
                left: layout.x,
                minWidth: Math.max(layout.width, 160),
              },
            ]}
          >
            {items.map((item) =>
              item.id === 'separator' ? (
                <View key={item.id} style={styles.separator} />
              ) : (
                <Pressable
                  key={item.id}
                  onPress={() => handleItemPress(item)}
                  disabled={item.disabled}
                  style={({ pressed }) => [
                    styles.item,
                    item.disabled && styles.itemDisabled,
                    pressed && styles.itemPressed,
                  ]}
                  accessibilityRole="menuitem"
                  accessibilityState={{ disabled: item.disabled }}
                >
                  {item.icon && (
                    <View style={styles.itemIcon}>{item.icon}</View>
                  )}
                  <Text
                    style={[
                      styles.itemLabel,
                      item.danger && styles.itemDanger,
                      item.disabled && styles.itemLabelDisabled,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
