import {FC} from 'react';
import ConfigCard from './ConfigCard';
import Button from './Button';
import APP_STRINGS from '../strings';

const {
  cards,
  startButton,
  totalTimeStr,
} = APP_STRINGS.config;

interface ConfigViewProps {
  timeSummary: string,
  // TODO: update data to specific type
  data: any,
  onCardUpdate: Function,
}

const ConfigView: FC<ConfigViewProps> = ({
  timeSummary,
  data,
  onCardUpdate,
}) => (
  <>
    <h1 className="text-white my-5 select-none">
      {`${totalTimeStr} ${timeSummary}`}
    </h1>
    <div className='mb-20 mt-5 w-10/12 grid grid-cols-3 gap-3'>
      {cards.map(card => card && <ConfigCard key={card.name} value={data[card.name]} {...card} onUpdate={onCardUpdate}/>)}
    </div>
    <Button onButtonClick={() => console.log('started')}>{startButton}</Button>
  </>
);

export default ConfigView;