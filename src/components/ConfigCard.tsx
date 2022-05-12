import {FC} from 'react';
import {
  ClockIcon,
  FireIcon,
  LightningBoltIcon,
  HandIcon,
  RefreshIcon,
} from '@heroicons/react/outline';

interface ConfigCardProps {
  icon: string;
  title: string,
  description: string,
  onUpdate: Function,
}

const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'clock':
      return <ClockIcon className='h-7x w-7 text-white'/>
    case 'fire':
      return <FireIcon className='h-7x w-7 text-white'/>
    case 'lightning':
      return <LightningBoltIcon className='h-7x w-7 text-white'/>
    case 'hand':
      return <HandIcon className='h-7x w-7 text-white'/>
    case 'refresh':
      return <RefreshIcon className='h-7x w-7 text-white'/>
    default:
      return;
  }
}

const ConfigCard: FC<ConfigCardProps> = ({icon, title, description, onUpdate}): JSX.Element => {
  return (
    <div className="w-auto p-10 flex flex-col items-center bg-slate-800 rounded">
      <header className='flex'>
        {getIconComponent(icon)}
        <h1 className="text-white text-xl ml-5">{title}</h1>
      </header>
      <p className='text-white'>{description}</p>
      <button className='text-white rounded hover:bg-emerald-700 bg-emerald-500 p-3 transition ease-in-out delay-50 cursor-pointer' onClick={() => onUpdate(title)}>click me!</button>
    </div>
  )
}

export default ConfigCard;