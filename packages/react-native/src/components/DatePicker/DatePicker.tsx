import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
// @ts-expect-error — peer dep, installed by the consumer
import RNDateTimePicker from '@react-native-community/datetimepicker';
import type { DatePickerBaseProps } from '@switch/types';
import { styles } from './DatePicker.styles';

export interface DatePickerProps extends DatePickerBaseProps {
  /** Android only — mode for the native date picker ('calendar' | 'spinner' | 'default') */
  androidMode?: 'calendar' | 'spinner' | 'default';
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select a date',
  minDate,
  maxDate,
  disabled = false,
  isError = false,
  errorMessage,
  androidMode = 'default',
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  // iOS tracks an uncommitted selection in the sheet
  const [iosTemp, setIosTemp] = useState<Date>(value ?? new Date());

  const handleAndroidChange = (_: unknown, selected?: Date) => {
    setOpen(false);
    if (selected) onChange(selected);
  };

  const handleIOSChange = (_: unknown, selected?: Date) => {
    if (selected) setIosTemp(selected);
  };

  const handleIOSConfirm = () => {
    onChange(iosTemp);
    setOpen(false);
  };

  return (
    <View style={styles.root}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        onPress={() => !disabled && setOpen(true)}
        style={[
          styles.trigger,
          isError && styles.triggerError,
          disabled && styles.triggerDisabled,
        ]}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{ disabled }}
      >
        <Text style={[styles.triggerText, !value && styles.triggerPlaceholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>
        {/* Calendar icon */}
        <Text style={{ color: '#6b7280', fontSize: 16 }}>📅</Text>
      </Pressable>

      {errorMessage ? (
        <Text style={styles.errorMessage} accessibilityRole="alert">
          {errorMessage}
        </Text>
      ) : null}

      {/* Android: RNDateTimePicker renders inline as a dialog when open */}
      {Platform.OS === 'android' && open && (
        <RNDateTimePicker
          mode="date"
          display={androidMode}
          value={value ?? new Date()}
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={handleAndroidChange}
        />
      )}

      {/* iOS: bottom sheet */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={open}
          transparent
          animationType="slide"
          onRequestClose={() => setOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.sheet}>
                  <View style={styles.sheetHandle} />
                  <View style={styles.sheetHeader}>
                    <Pressable onPress={() => setOpen(false)}>
                      <Text style={styles.sheetAction}>Cancel</Text>
                    </Pressable>
                    <Text style={styles.sheetTitle}>{label ?? 'Select date'}</Text>
                    <Pressable onPress={handleIOSConfirm}>
                      <Text style={styles.sheetAction}>Done</Text>
                    </Pressable>
                  </View>
                  <RNDateTimePicker
                    mode="date"
                    display="spinner"
                    value={iosTemp}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    onChange={handleIOSChange}
                    style={{ height: 200 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}
