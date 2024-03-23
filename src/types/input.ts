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
  type?: 'email' | 'password' | 'text' | 'number';
  required?: boolean;
  formState?: FormState<T>;
  validation?: RegisterOptions;
  width?: string;
  height?: string;
  fontSize?: string;
  borderRadius?: string;
  borderColor?: string;
  backgroundColor?: string;
  isTrim?: boolean;
}

export interface InputListType<T extends FieldValues>
  extends Omit<
    InputProps<T>,
    | 'register'
    | 'width'
    | 'height'
    | 'fontSize'
    | 'borderRadius'
    | 'borderColor'
    | 'backgroundColor'
  > {
  guide?: React.ReactNode;
}

export type InputListProps<T extends FieldValues> = InputListType<T>[];
