import React, { createContext, useContext, useState, useCallback, FormEvent } from 'react';
import styles from './Form.module.css';

// Validation rules
export type ValidationRule<T = any> = {
  validate: (value: T, formValues: Record<string, any>) => boolean;
  message: string;
};

export const validators = {
  required: (message = 'This field is required'): ValidationRule<string> => ({
    validate: (value) => value !== undefined && value !== null && value !== '',
    message,
  }),

  email: (message = 'Please enter a valid email'): ValidationRule<string> => ({
    validate: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value) => !value || value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value) => !value || value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value) => !value || regex.test(value),
    message,
  }),

  match: (fieldName: string, message?: string): ValidationRule<string> => ({
    validate: (value, formValues) => value === formValues[fieldName],
    message: message || `Must match ${fieldName}`,
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule<string> => ({
    validate: (value) => !value || /^[\d\s\-+()]{10,}$/.test(value),
    message,
  }),

  number: (message = 'Please enter a valid number'): ValidationRule<string> => ({
    validate: (value) => !value || !isNaN(Number(value)),
    message,
  }),

  min: (minVal: number, message?: string): ValidationRule<string> => ({
    validate: (value) => !value || Number(value) >= minVal,
    message: message || `Must be at least ${minVal}`,
  }),

  max: (maxVal: number, message?: string): ValidationRule<string> => ({
    validate: (value) => !value || Number(value) <= maxVal,
    message: message || `Must be no more than ${maxVal}`,
  }),
};

// Form context
interface FormContextValue {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (name: string, value: any) => void;
  setTouched: (name: string) => void;
  registerField: (name: string, rules: ValidationRule[]) => void;
  isSubmitting: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form');
  }
  return context;
}

// Form field hook for custom integrations
export function useFormField(name: string, rules: ValidationRule[] = []) {
  const { values, errors, touched, setValue, setTouched, registerField } = useFormContext();

  React.useEffect(() => {
    registerField(name, rules);
  }, [name, rules, registerField]);

  return {
    value: values[name] ?? '',
    error: touched[name] ? errors[name] : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValue(name, e.target.value);
    },
    onBlur: () => setTouched(name),
  };
}

export interface FormProps {
  /** Initial form values */
  initialValues?: Record<string, any>;
  /** Called on valid form submission */
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  /** Validation schema - map of field names to validation rules */
  validationSchema?: Record<string, ValidationRule[]>;
  /** Form children */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

export function Form({
  initialValues = {},
  onSubmit,
  validationSchema = {},
  children,
  className,
}: FormProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldRules, setFieldRules] = useState<Record<string, ValidationRule[]>>(validationSchema);

  const validateField = useCallback((name: string, value: any): string => {
    const rules = fieldRules[name] || [];
    for (const rule of rules) {
      if (!rule.validate(value, values)) {
        return rule.message;
      }
    }
    return '';
  }, [fieldRules, values]);

  const validateAll = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(fieldRules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [fieldRules, values, validateField]);

  const setValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const setTouched = useCallback((name: string) => {
    setTouchedState((prev) => ({ ...prev, [name]: true }));
    // Validate on blur
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  const registerField = useCallback((name: string, rules: ValidationRule[]) => {
    setFieldRules((prev) => ({ ...prev, [name]: rules }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(fieldRules).forEach((name) => {
      allTouched[name] = true;
    });
    setTouchedState(allTouched);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextValue: FormContextValue = {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    registerField,
    isSubmitting,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit} className={[styles.form, className].filter(Boolean).join(' ')}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

// Form.Submit component
interface FormSubmitProps {
  children: React.ReactNode;
  className?: string;
}

Form.Submit = function FormSubmit({ children, className }: FormSubmitProps) {
  const { isSubmitting } = useFormContext();
  return (
    <div className={[styles.submitRow, className].filter(Boolean).join(' ')}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childProps = child.props as Record<string, unknown>;
          if (childProps.type === 'submit') {
            return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
              isLoading: isSubmitting,
              disabled: isSubmitting || childProps.disabled,
            });
          }
        }
        return child;
      })}
    </div>
  );
};

// Form.Field component that integrates with FormField
Form.Field = function FormFieldWrapper({
  name,
  rules = [],
  ...props
}: {
  name: string;
  rules?: ValidationRule[];
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select';
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}) {
  const { value, error, onChange, onBlur } = useFormField(name, rules);

  // Dynamically import FormField to avoid circular dependency
  const FormField = require('../FormField/FormField').FormField;

  return (
    <FormField
      {...props}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
    />
  );
};
