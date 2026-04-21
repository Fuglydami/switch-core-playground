import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import type { InputBaseProps } from '@switch/types';
import { styles } from './Input.styles';

export interface InputProps extends InputBaseProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  testID?: string;
}

export function Input({
  label,
  helperText,
  errorMessage,
  isError = false,
  size = 'large',
  leftAddon,
  rightAddon,
  disabled,
  placeholder,
  value,
  onChangeText,
  testID,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const hasError = isError || Boolean(errorMessage);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          size === 'small' && styles.inputWrapperSmall,
          focused && styles.inputWrapperFocused,
          hasError && styles.inputWrapperError,
          disabled && styles.inputWrapperDisabled,
        ]}
      >
        {leftAddon && <View style={styles.addon}>{leftAddon}</View>}

        <TextInput
          style={[styles.input, size === 'small' && styles.inputSmall]}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessible
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          testID={testID}
        />

        {rightAddon && <View style={styles.addon}>{rightAddon}</View>}
      </View>

      {(errorMessage || helperText) && (
        <Text style={[styles.helperText, hasError && styles.errorText]}>
          {errorMessage || helperText}
        </Text>
      )}
    </View>
  );
}
