import React from 'react';
import { Modal as RNModal, View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ModalBaseProps } from '@switch/types';
import { Button } from '../Button';
import { styles } from './Modal.styles';

export interface ModalProps extends ModalBaseProps {}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback accessible={false}>
            <SafeAreaView style={styles.modal} edges={['bottom']}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title} accessibilityRole="header">
                  {title}
                </Text>
                <Pressable
                  onPress={onClose}
                  style={styles.closeButton}
                  accessibilityLabel="Close modal"
                  accessibilityRole="button"
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              </View>

              {/* Content */}
              <View style={styles.content}>
                {typeof children === 'string' ? (
                  <Text style={styles.contentText}>{children}</Text>
                ) : (
                  children
                )}
              </View>

              {/* Footer */}
              {(primaryAction || secondaryAction) && (
                <View style={styles.footer}>
                  {secondaryAction && (
                    <Button
                      variant="secondary"
                      colorScheme="monochrome"
                      onPress={secondaryAction.onPress}
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                  {primaryAction && (
                    <Button
                      variant="primary"
                      colorScheme="activeBlue"
                      onPress={primaryAction.onPress}
                      isLoading={primaryAction.isLoading}
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                </View>
              )}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}
