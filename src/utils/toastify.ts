import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';

export const defaultToastOption: ToastOptions = {
  position: 'bottom-right',
  autoClose: 1000,
  closeOnClick: true,
  theme: 'light',
  hideProgressBar: true,
};

export const toastify = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, {
      ...defaultToastOption,
      ...options,
    });
  },
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultToastOption, ...options });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultToastOption, ...options });
  },
};
