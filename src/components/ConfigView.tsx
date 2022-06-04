import {EventHandler, FC, MouseEvent} from 'react';
import ConfigCard from './ConfigCard';
import Button from './Button';
import {totalMinutesStr} from '../utils/timeTransformers';
import APP_STRINGS from '../strings';

const {
  cards,
  startButton,
  totalTimeStr,
} = APP_STRINGS.config;

interface ConfigViewProps {
  timeSummary: number,
  // TODO: update data to specific type
  data: any,
  onCardUpdate: Function,
  onWorkInit: EventHandler<MouseEvent>,
}

const ConfigView: FC<ConfigViewProps> = ({
  timeSummary,
  data,
  onCardUpdate,
  onWorkInit,
}) => (
  <>
    <h1 className="text-white my-5 select-none">
      {`${totalTimeStr} ${Number.isNaN(timeSummary) || timeSummary === 0 ? '--:--' : totalMinutesStr(timeSummary)}`}
    </h1>
    <form className='mb-20 mt-5 w-10/12 grid grid-cols-3 gap-3'>
      {cards.map(card => card && <ConfigCard key={card.name} value={data[card.name]} {...card} onUpdate={onCardUpdate}/>)}
    </form>
    <Button onButtonClick={onWorkInit}>{startButton}</Button>
  </>
);

export default ConfigView;