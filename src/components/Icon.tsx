import {FC} from 'react';
import {
  ClockIcon,
  FireIcon,
  LightningBoltIcon,
  HandIcon,
  RefreshIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/outline';

interface IconProps {
  classes?: string,
  iconName: string,
}

const ICON_CLASSES = 'h-7x w-7 text-white';

const Icon: FC<IconProps> = ({classes, iconName}) => {
  const classStyles = classes ? classes : ICON_CLASSES;
  switch (iconName) {
    case 'preparation':
      return <ClockIcon className={classStyles}/>
    case 'work':
      return <FireIcon className={classStyles}/>
    case 'excercises':
      return <LightningBoltIcon className={classStyles}/>
    case 'restBetweenSets':
      return <HandIcon className={classStyles}/>
    case 'restBetweenExcercises':
      return <HandIcon className={classStyles}/>
    case 'sets':
      return <RefreshIcon className={classStyles}/>
    case 'minus':
      return <MinusIcon className={classStyles}/>
    case 'plus':
      return <PlusIcon className={classStyles}/>
    default:
      return;
  }
}

export default Icon;