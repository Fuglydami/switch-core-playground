import { useState, useCallback, useRef } from 'react';
import type { ToastProps } from '../components/Toast/Toast';

type ToastItem = ToastProps & { id: string };

let idCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissRef = useRef(dismiss);
  dismissRef.current = dismiss;

  const toast = useCallback((props: Omit<ToastProps, 'onDismiss'>) => {
    const id = `toast-${++idCounter}`;
    const item: ToastItem = {
      ...props,
      id,
      onDismiss: () => dismissRef.current(id),
    };
    setToasts((prev) => [...prev, item]);

    if (props.duration !== 0) {
      setTimeout(() => dismissRef.current(id), props.duration ?? 5000);
    }

    return id;
  }, []);

  return { toasts, toast, dismiss };
}
