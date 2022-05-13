import {FC, useState} from 'react';
import {
  ClockIcon,
  FireIcon,
  LightningBoltIcon,
  HandIcon,
  RefreshIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/outline';

const BUTTON_CLASSES = 'w-8 h-8 min-w-10 flex items-center justify-center hover:bg-slate-700 bg-slate-600 rounded-full transition ease-in-out delay-50 cursor-pointer';
const BUTTON_ICON_CLASSES = 'stroke-teal-300';
const ICON_CLASSES = 'h-7x w-7 text-white';

interface ConfigCardProps {
  icon: string;
  title: string,
  description: string,
  onUpdate: Function,
}
// TODO: Test this
const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'clock':
      return <ClockIcon className={ICON_CLASSES}/>
    case 'fire':
      return <FireIcon className={ICON_CLASSES}/>
    case 'lightning':
      return <LightningBoltIcon className={ICON_CLASSES}/>
    case 'hand':
      return <HandIcon className={ICON_CLASSES}/>
    case 'refresh':
      return <RefreshIcon className={ICON_CLASSES}/>
    default:
      return;
  }
}

// TODO: Test this
const ConfigCard: FC<ConfigCardProps> = ({icon, title, description, onUpdate}): JSX.Element => {
  const hasInitializedVal: boolean = title === 'sets' || title === 'work' || title === 'excercises';
  const [currentValue, setValue] = hasInitializedVal ? useState(1) : useState(0);
  
  // TODO: Test this
  const buttonUpdateValue = (e: any, isMin?: boolean | undefined) => {
    e.preventDefault();
    let newValue: number;

    if (isMin) {
      newValue = currentValue === 0 ? 0 : (hasInitializedVal && currentValue === 1 ? 1 : currentValue - 1);
    } else {
      newValue = currentValue + 1;
    }
    setValue(newValue)
    onUpdate(newValue);
  }

  // TODO: Test this
  const inputUpdate = ({target: {value}}: any) => {
    let newValue: number;

    if (value === '0' && hasInitializedVal) {
      newValue = 1;
    } else {
      newValue = parseInt(value);
    }

    setValue(newValue);
    onUpdate(newValue);
  } 

  return (
    <div className="w-auto py-[27] px-[17] flex flex-col items-center bg-slate-800 border border-slate-600 rounded">
      <header className='flex my-5'>
        {getIconComponent(icon)}
        <h1 className="text-white text-3xl ml-2 capitalize select-none">{title}</h1>
      </header>
      <div className='flex justify-center space-x-4 items-center my-[35]'>
        <a className={BUTTON_CLASSES} onClick={(e) => buttonUpdateValue(e, true)}>
          <MinusIcon className={BUTTON_ICON_CLASSES}/>
        </a>
        <input className='flex-initial w-40 bg-transparent text-white text-6xl text-center focus:outline-none'
          type="number" value={currentValue}
          onChange={(e) => inputUpdate(e)}/>
          {/* TODO: VALIDATE EMPTY VALUES */}
        <a className={BUTTON_CLASSES} onClick={(e) => buttonUpdateValue(e)}>
          <PlusIcon className={BUTTON_ICON_CLASSES}/>
        </a>
      </div>
      <p className='text-white text-center capitalize select-none'>{description}</p>
    </div>
  )
}

export default ConfigCard;