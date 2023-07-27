import React, { EventHandler, FC, MouseEvent } from 'react';
import { InitialConfig } from '../types';
import { totalMinutesStr } from '../utils/timeTransformers';
import APP_STRINGS from '../strings';
import ConfigCard from './ConfigCard';
import Button from './Button';

export interface NewValue {
  name: string,
  newValue: number,
}

const {
  cards,
  startButton,
  totalTimeStr,
} = APP_STRINGS.config;

interface ConfigViewProps {
  timeSummary: number,
  data: InitialConfig,
  onCardUpdate: (value: NewValue) => void,
  onWorkInit: EventHandler<MouseEvent>,
}

const ConfigView: FC<ConfigViewProps> = ({
  timeSummary,
  data,
  onCardUpdate,
  onWorkInit,
}) => (
  <>
    <h1 className='text-white my-5 select-none'>
      {/* TODO: Move this to utils, this line too long */}
      {`${totalTimeStr} ${Number.isNaN(timeSummary) || timeSummary === 0 ? '--:--' : totalMinutesStr(timeSummary)}`}
    </h1>
    <form className='mb-20 mt-5 w-10/12 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {cards.map(card => card && <ConfigCard key={card.name} value={data[card.name]} {...card} onUpdate={onCardUpdate}/>)}
    </form>
    <Button onButtonClick={onWorkInit}>{startButton}</Button>
  </>
);

export default ConfigView;