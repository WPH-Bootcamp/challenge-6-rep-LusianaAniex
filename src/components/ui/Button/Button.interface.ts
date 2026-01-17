export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | undefined;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'icon';
}
