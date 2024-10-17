import type { IconType } from 'react-icons';

import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

export type Variant = 'LOGIN' | 'REGISTER';

export type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
};

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

export type SocialButtonProps = {
  icon: IconType;
  onClick: () => void;
};
