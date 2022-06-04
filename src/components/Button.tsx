import {FC, MouseEventHandler, ReactNode} from 'react';

const BUTTON_CLASSES = 'px-10 m-5 py-5 mb-20 bg-teal-300 hover:bg-teal-400 text-slate-900 rounded select-none text-bold transition ease-in-out delay-50 cursor-pointer';

interface ButtonProps {
  children: ReactNode,
  onButtonClick: MouseEventHandler<HTMLButtonElement>,
  isDisabled?: boolean,
}

const Button: FC<ButtonProps> = ({children, onButtonClick, isDisabled}): JSX.Element => {
  return (
    <button className={BUTTON_CLASSES} onClick={onButtonClick} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Button;
