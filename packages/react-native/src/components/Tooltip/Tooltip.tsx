import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { styles } from './Tooltip.styles';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  helperText?: string;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  helperText,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const [layout, setLayout] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = React.useRef<View>(null);

  const show = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
      setVisible(true);
    });
  };

  const hide = () => setVisible(false);

  const getTooltipPosition = () => {
    const { x, y, width, height } = layout;
    const tooltipOffset = 8;

    switch (placement) {
      case 'bottom':
        return { top: y + height + tooltipOffset, left: x + width / 2 };
      case 'left':
        return { top: y + height / 2, left: x - tooltipOffset };
      case 'right':
        return { top: y + height / 2, left: x + width + tooltipOffset };
      case 'top':
      default:
        return { top: y - tooltipOffset, left: x + width / 2 };
    }
  };

  const position = getTooltipPosition();

  return (
    <>
      <Pressable
        ref={triggerRef}
        onPressIn={show}
        onPressOut={hide}
        onLongPress={show}
      >
        {children}
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={hide}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={hide}>
          <View
            style={[
              styles.tooltip,
              styles[placement],
              {
                top: position.top,
                left: position.left,
                transform: [
                  { translateX: placement === 'left' ? -100 : placement === 'right' ? 0 : -50 },
                  { translateY: placement === 'top' ? -100 : placement === 'bottom' ? 0 : -50 },
                ],
              },
            ]}
            accessibilityRole="alert"
          >
            <Text style={styles.content}>{content}</Text>
            {helperText && <Text style={styles.helperText}>{helperText}</Text>}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
