import React, { FC, useEffect, useRef, useState } from 'react';
import { lowerCase, capitalize } from 'lodash';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { Cycle, InitialConfig } from '../types';
import { PREPARATION } from '../store/tabata';
import { totalMinutesStr } from '../utils/timeTransformers';
import CycleTimer from '../classes/CycleTimer';
import { segsToNum } from '../utils/timeTransformers';
import tabataIterator from '../utils/tabataIterator';
import WorkInterval from './WorkInterval';
import Button from './Button';
import Icon from './Icon';

const END_BUTTON_CLASSES = "flex gap-3 align-middle px-8 py-5 rounded-full background-opacity-0 border border-red-400 text-red-400 justify-center items-center hover:opacity-[0.8] transition ease-in-out delay-50 cursor-pointer";
const CONTROL_BUTTON_CLASSES = "flex gap-3 align-middle bg-teal-300 px-8 py-5 rounded-full align-middle justify-center items-center hover:opacity-[0.8] transition ease-in-out delay-50 cursor-pointer"
const BUTTON_ICON_CLASSES = 'h-10 w-10 stroke-slate-800';
const BUTTON_END_ICON_CLASSES = 'h-10 w-10 stroke-red-400';

interface WorkViewProps {
  internalCyIndex: number,
  config?: InitialConfig,
  cycles: Array<[Cycle]>,
  currentCycle: Cycle | any,
  currentSet: number,
  timeSummary: number,
  totalSets: number,
  // TODO: Add proprer typing matching AudioBuffer Class
  dingSound: any,
  finalDingSound: any,
}

interface CyTimer {
  current: {
    init: () => Promise<boolean>,
    pause: () => void;
    resume: () => void;
  },
}

const WorkView: FC<WorkViewProps> = ({
  internalCyIndex,
  cycles,
  currentCycle,
  currentSet,
  timeSummary,
  totalSets,
  dingSound,
  finalDingSound,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cyTimer: CyTimer = useRef();
  const totalTimeCount = useRef(timeSummary);
  const { cycle, time } = currentCycle;
  const [cyTimeCount, updateTimeCount] = useState(time);
  const [pausedState, onPausedState] = useState(false);

  const playSound = (segs: number) => {
    if (segs <= 3 && dingSound != null) {
      if (segs === 1) {
        return finalDingSound.playSound();
      }
      dingSound.playSound();
    }
  }

  const onTimeUpdate = time => {
    playSound(segsToNum(time))
    updateTimeCount(time);
    totalTimeCount.current = totalTimeCount.current - 1;
  };

  const onUpdateTimeState = () => {
    if (!pausedState && cyTimer.current) {
      onPausedState(true);
      cyTimer.current.pause();
    } else {
      onPausedState(false);
      cyTimer.current.resume();
    }
  }
  const onFinishTabata = () => location.reload();

  useEffect(() => {
    // Initialize Cycle
    cyTimer.current = new CycleTimer(cycle, time, onTimeUpdate);
    // Handle Cycle Ending
    cyTimer
    .current
    .init()
    .then(() => {
      return tabataIterator(
        cycles[currentSet].length - 1,
        internalCyIndex,
        updateTimeCount,
        dispatch,
        currentSet,
        cycles,
      );
    });
  }, [currentSet, internalCyIndex]);

  return (
    <section className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-row-reverse px-20">
        <h1 className="text-white text-2xl my-5 select-none">
          Time Remaining: {totalMinutesStr(totalTimeCount.current)}
        </h1>
      </div>
      <div className="flex flex-col w-full h-full px-10">
        {/* Counter Section */}
        <div className="flex flex-col md:flex-row h-full gap-4 align-middle">
          <WorkInterval name={cycle} time={segsToNum(cyTimeCount)}/>
          {/* Work Preview */}
          {cycle !== PREPARATION ? (
            <div className="flex flex-col w-full md:w-3/12 bg-slate-800 rounded-lg border border-slate-600 p-2">
              <div className="flex bg-slate-600 rounded-full w-full justify-center p-2">
                <h1 className='text-white text-xl text-center'>
                  {cycle !== PREPARATION ? `${currentSet}/${totalSets} Sets` : ''}
                </h1>
              </div>
              <ul className="flex flex-col w-full pt-4">
                {cycles[currentSet].map(({ id, cycle, time }) => (
                  <li key={id} className="flex w-full gap-2 h-auto text-lg text-white py-2 items-center">
                    <section className={`flex w-[38px] h-[38px] ${ id === currentCycle.id ? 'bg-teal-300' :' bg-slate-600' } rounded-full text-white items-center justify-center`}>
                      {segsToNum(time)}
                    </section>
                    <p className="text-[16px]">{capitalize(lowerCase(cycle))}</p>
                  </li>
                ))}
              </ul>
            </div> 
          ) : null}
        </div>
        {/* Set Counter */}
        <div className='flex flex-col gap-5 justify-center lg:flex-row py-8'>
          <Button className={CONTROL_BUTTON_CLASSES} onButtonClick={onUpdateTimeState}>{!pausedState ? (
            <>
              <Icon iconName="pause" classes={BUTTON_ICON_CLASSES} />
              <span className='text-lg'>Pause</span>
            </>
          ): (
            <>
              <Icon iconName="play" classes={BUTTON_ICON_CLASSES} />
              <span className='text-lg'>Continue</span>
            </>
          )}</Button>
          <Button className={END_BUTTON_CLASSES} onButtonClick={onFinishTabata}>
            <Icon iconName="close" classes={BUTTON_END_ICON_CLASSES} />
            <span className='text-lg'>End Tabata</span>
          </Button>
        </div>
      </div>
    </section>
  )
};

export default WorkView;