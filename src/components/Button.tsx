import React, {FC, MouseEventHandler, ReactNode} from 'react';

const BUTTON_CLASSES = `
  px-10 m-5 py-5 mb-20 bg-teal-300
  hover:bg-teal-400 text-slate-900 
  rounded-full select-none text-bold transition 
  ease-in-out delay-50 cursor-pointer hover:opacity-[0.8]
`;

interface ButtonProps {
  className: string,
  children: ReactNode,
  onButtonClick: MouseEventHandler<HTMLButtonElement>,
  isDisabled?: boolean,
}

const Button: FC<ButtonProps> = ({className, children, onButtonClick, isDisabled}): JSX.Element => {
  const btnClasses = !className ? isDisabled ? BUTTON_CLASSES + 'opacity-[0.8] cursor-not-allowed' : BUTTON_CLASSES: className;
  return (
    <button
      className={btnClasses}
      onClick={onButtonClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
