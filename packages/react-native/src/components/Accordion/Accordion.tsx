import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './Accordion.styles';

export interface AccordionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once */
  multiple?: boolean;
  /** IDs of initially expanded panels */
  defaultOpen?: string[];
  /** Controlled open state */
  openIds?: string[];
  onToggle?: (openIds: string[]) => void;
  /** Visual variant: bordered (default) or borderless */
  variant?: 'bordered' | 'borderless';
}

function AccordionPanel({
  item,
  isOpen,
  onPress,
  variant,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onPress: () => void;
  variant: 'bordered' | 'borderless';
}) {
  const rotation = useSharedValue(isOpen ? 180 : 0);

  React.useEffect(() => {
    rotation.value = withTiming(isOpen ? 180 : 0, { duration: 200 });
  }, [isOpen, rotation]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View
      style={[
        styles.item,
        variant === 'bordered' && styles.itemBordered,
        item.disabled && styles.itemDisabled,
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={item.disabled}
        style={[styles.trigger, isOpen && styles.triggerOpen]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled: item.disabled }}
        accessibilityLabel={item.label}
      >
        {item.icon && <View style={styles.leadingIcon}>{item.icon}</View>}
        <Text style={[styles.label, item.disabled && styles.labelDisabled]}>
          {item.label}
        </Text>
        <Animated.View style={[styles.chevron, chevronStyle]}>
          <Text style={styles.chevronText}>{'\u2304'}</Text>
        </Animated.View>
      </Pressable>

      {isOpen && (
        <View style={styles.panel}>
          <View style={styles.panelContent}>{item.content}</View>
        </View>
      )}
    </View>
  );
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  openIds: controlledOpen,
  onToggle,
  variant = 'bordered',
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = React.useState<string[]>(defaultOpen);
  const openIds = controlledOpen ?? internalOpen;

  const toggle = (id: string) => {
    let next: string[];
    if (openIds.includes(id)) {
      next = openIds.filter((x) => x !== id);
    } else {
      next = multiple ? [...openIds, id] : [id];
    }
    setInternalOpen(next);
    onToggle?.(next);
  };

  return (
    <View style={[styles.accordion, variant === 'borderless' && styles.borderless]}>
      {items.map((item) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onPress={() => !item.disabled && toggle(item.id)}
          variant={variant}
        />
      ))}
    </View>
  );
}
