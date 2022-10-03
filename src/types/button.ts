export default interface IButton {
  name: string;
  icon?: Element;
  backgroundColor: string;
  onPress: () => void;
  variant?: string;
}
