import {KeyboardTypeOptions} from 'react-native';

export default interface IInput {
  label?: string;
  multiline?: boolean;
  defaultValue?: string;
  enablesReturnKeyAutomatically?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  autoFocus?: boolean;
  maxLength?: number;
  rightElement?: JSX.Element;
  leftElement?: JSX.Element;
  stackWidth?: string | number;
  isRequired?: boolean;
}
