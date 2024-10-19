import type { IconType } from 'react-icons';
import type { Conversation, Message, User } from '@prisma/client';

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

export type DesktopItemProps = {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

export type MobileItemProps = {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

export type MessageType = Message & {
  sender: User;
  seen: User[];
};

export type ConversationType = Conversation & {
  users: User[];
  messages: MessageType[];
};

export type ConversationBoxProps = {
  conversation: ConversationType;
  selected?: boolean;
};

export type Header = {
  conversation: Conversation & {
    users: User[];
  };
};

export type MessageInputProps = {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
};
