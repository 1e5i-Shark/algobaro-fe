import {
  FieldValues,
  FormState,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface InputProps<T extends FieldValues>
  extends React.ComponentProps<'input'> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  type?: 'email' | 'password' | 'text';
  required?: boolean;
  formState?: FormState<T>;
  validation?: RegisterOptions;
}

export interface InputListType<T extends FieldValues>
  extends Omit<InputProps<T>, 'register' | 'errors'> {
  guide?: React.ReactNode;
}

export type InputListProps<T extends FieldValues> = InputListType<T>[];
