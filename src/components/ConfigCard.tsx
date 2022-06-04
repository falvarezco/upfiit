import {FC, useState} from 'react';
import {lowerCase, capitalize} from 'lodash';
import Icon from './Icon';

const BUTTON_CLASSES = 'w-8 h-8 min-w-10 flex items-center justify-center hover:bg-slate-700 bg-slate-600 rounded-full transition ease-in-out delay-50 cursor-pointer';
const BUTTON_ICON_CLASSES = 'stroke-teal-300';

interface ConfigCardProps {
  name: string,
  description: string,
  value: number,
  onUpdate: Function,
}

// TODO: Test this
const ConfigCard: FC<ConfigCardProps> = ({name, description, value, onUpdate}): JSX.Element => {
  const hasInitializedVal: boolean = name === 'sets' || name === 'work' || name === 'excercises';
  const [currentValue, setValue] = useState(value);
  const cardTitle = capitalize(lowerCase(name));
  const cardClasses = `w-auto py-[27] px-[17] flex flex-col items-center bg-slate-800 border border-slate-600 rounded`;
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
    onUpdate({name, newValue});
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
    onUpdate({name, newValue});
  }

  return (
    <div className={cardClasses}>
      <header className='flex my-5'>
        <Icon iconName={name} />
        <h1 className="text-white text-xl ml-2 select-none">{cardTitle}</h1>
      </header>
      <div className='flex justify-center space-x-4 items-center my-[35]'>
        <a className={BUTTON_CLASSES} onClick={(e) => buttonUpdateValue(e, true)}>
          <Icon iconName="minus" classes={BUTTON_ICON_CLASSES}/>
        </a>
        <input 
          className='flex-initial w-40 bg-transparent text-white text-6xl text-center focus:outline-none'
          type="number" value={currentValue}
          // onFocus={onCardSelected}
          onChange={(e) => inputUpdate(e)}/>
          {/* TODO: VALIDATE EMPTY VALUES */}
        <a className={BUTTON_CLASSES} onClick={(e) => buttonUpdateValue(e)}>
          <Icon iconName="plus" classes={BUTTON_ICON_CLASSES}/>
        </a>
      </div>
      <p className='text-white text-center capitalize select-none'>{description}</p>
    </div>
  )
}

export default ConfigCard;