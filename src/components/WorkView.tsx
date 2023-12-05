import React, { FC, useEffect, useRef, useState } from 'react';
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

  const onPauseTimer = () => cyTimer.current && cyTimer.current.pause();
  const onResumeTimer = () => cyTimer.current && cyTimer.current.resume();

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
        <div className="flex flex-row h-full gap-4 align-middle">
          <WorkInterval name={cycle} time={segsToNum(cyTimeCount)}/>
          {/* Work Preview */}
          {cycle !== PREPARATION ?(
            <div className="flex flex-col w-2/12 bg-slate-800 rounded-lg border border-slate-600 p-3">
              <div className="flex bg-slate-600 rounded-full w-full justify-center p-2">
                <h1 className='text-white text-xl text-center'>
                  {cycle !== PREPARATION ? `${currentSet}/${totalSets} Sets` : ''}
                </h1>
              </div>
              <ul className="flex flex-col w-full p-4">
                {cycles[currentSet].map(({ cycle, time }) => (
                  <li key={currentSet} className="flex w-full gap-2 h-auto text-lg text-white py-2 items-center">
                    <section className="flex w-[38px] h-[38px] bg-slate-600 rounded-full text-white items-center justify-center">
                      {segsToNum(time)}
                    </section>
                    {cycle}
                  </li>
                ))}
              </ul>
            </div> 
          ) : null}
        </div>
        {/* Set Counter */}
        <div className=' flex justify-center'>
          <Button onButtonClick={onPauseTimer}>Pause</Button>
          <Button onButtonClick={onResumeTimer}>Resume</Button>
        </div>
      </div>
    </section>
  )
};

export default WorkView;