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
  audioInitialized: boolean,
  timeSummary: number,
  data: InitialConfig,
  onCardUpdate: (value: NewValue) => void,
  onWorkInit: EventHandler<MouseEvent>,
  onAllowAudio: any,
}

const ConfigView: FC<ConfigViewProps> = ({
  audioInitialized,
  timeSummary,
  data,
  onCardUpdate,
  onWorkInit,
  onAllowAudio,
}) =>{

  return (
    <>
      {/* {!audioInitialized && <AudioRequestConfirm onUpdate={onInitAudio}/>} */}
      <div className="flex w-10/12 flex-row-reverse">
        <h1 className="text-white text-2xl my-5 select-none">
          {/* TODO: Move this to utils, this line too long */}
          {`${totalTimeStr} ${Number.isNaN(timeSummary) || timeSummary === 0 ? '--:--' : totalMinutesStr(timeSummary)}`}
        </h1>
      </div>
      <form className="mb-20 mt-5 w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.map(card => card && <ConfigCard key={card.name} value={data[card.name]} {...card} onUpdate={onCardUpdate}/>)}
      </form>
      <footer className="flex flex-col justify-center p-2">
        <form className="flex gap-3 my-2 justify-center">
          <label className="text-white" htmlFor="audioCheck">Allow Audio Sounds For A Better Experience</label>
          <input id="audioCheck" type="checkbox" onChange={onAllowAudio}/>
        </form>
        <Button onButtonClick={onWorkInit} isDisabled={!audioInitialized}>{startButton}</Button>
      </footer>
    </>
  )
};

export default ConfigView;