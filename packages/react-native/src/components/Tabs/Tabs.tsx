import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import type { TabsBaseProps } from '@switch/types';
import { styles } from './Tabs.styles';

export interface TabsProps extends TabsBaseProps {}

export function Tabs({ items, activeId, onChange, variant = 'underline' }: TabsProps) {
  const isPill = variant === 'pill';

  const renderTab = (item: TabsBaseProps['items'][number]) => {
    const isActive = item.id === activeId;
    const isDisabled = item.disabled;

    if (isPill) {
      return (
        <Pressable
          key={item.id}
          onPress={() => !isDisabled && onChange(item.id)}
          style={[styles.pillTab, isActive && styles.pillTabActive, isDisabled && styles.tabDisabled]}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive, disabled: isDisabled }}
        >
          {item.icon}
          <Text style={[styles.pillLabel, isActive && styles.pillLabelActive]}>
            {item.label}
          </Text>
          {item.badge !== undefined && (
            <View style={styles.pill}>
              <Text style={styles.pillText}>{item.badge}</Text>
            </View>
          )}
        </Pressable>
      );
    }

    return (
      <Pressable
        key={item.id}
        onPress={() => !isDisabled && onChange(item.id)}
        style={[styles.tab, isActive && styles.tabActive, isDisabled && styles.tabDisabled]}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive, disabled: isDisabled }}
      >
        {item.icon}
        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
          {item.label}
        </Text>
        {item.badge !== undefined && (
          <View style={styles.pill}>
            <Text style={styles.pillText}>{item.badge}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  if (isPill) {
    return (
      <View style={styles.tablistPill} accessibilityRole="tablist">
        {items.map(renderTab)}
      </View>
    );
  }

  return (
    <View style={styles.tablistDefault} accessibilityRole="tablist">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {items.map(renderTab)}
      </ScrollView>
    </View>
  );
}
