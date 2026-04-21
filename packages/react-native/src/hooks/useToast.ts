import { useState, useCallback } from 'react';
import type { ToastBaseProps } from '@switch/types';

type ToastItem = ToastBaseProps & { id: string };

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (props: Omit<ToastBaseProps, 'onDismiss'>) => {
      const id = Date.now().toString();
      const item: ToastItem = {
        ...props,
        id,
        onDismiss: () => dismiss(id),
      };
      setToasts((prev) => [...prev, item]);

      if (props.duration !== Infinity) {
        setTimeout(() => dismiss(id), props.duration ?? 5000);
      }

      return id;
    },
    [dismiss]
  );

  return { toasts, show, dismiss };
}
