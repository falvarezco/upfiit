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
// Audio
import startDing from '../audio/start-ding.mp3';
import startFinalDing from '../audio/start-final-ding.mp3';

interface WorkViewProps {
  internalCyIndex: number,
  config?: InitialConfig,
  cycles: Array<[Cycle]>,
  currentCycle: Cycle | any,
  currentSet: number,
  timeSummary: number,
  totalSets: number,
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
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cyTimer: CyTimer = useRef();
  const totalTimeCount = useRef(timeSummary);
  const { cycle, time } = currentCycle;
  const [cyTimeCount, updateTimeCount] = useState(time);

  const startDingSound = new Audio(startDing);
  const startFinalDingSound = new Audio(startFinalDing);

  const playDingAudio = (segs) => {
    if (segs <= 4) {
      if (segs <= 1) {
        return startFinalDingSound.play();
      }
      return startDingSound.play();
    }
  }

  const onTimeUpdate = time => {
    playDingAudio(segsToNum(time))
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
    <>
      <h1 className="text-white my-5 select-none">Time: {totalMinutesStr(totalTimeCount.current)}</h1>
      <div className="flex flex-col w-full px-10 justify-center">
        {/* Counter Section */}
        <WorkInterval name={cycle} time={segsToNum(cyTimeCount)}/>
        {/* Set Counter */}
        <div className=' flex justify-center'>
          <Button onButtonClick={onPauseTimer}>Pause</Button>
          <Button onButtonClick={onResumeTimer}>Resume</Button>
        </div>
        <div className="flex w-full justify-center p-10">
          <h1 className='text-white text-center'>
            {cycle !== PREPARATION ? `${currentSet}/${totalSets} Sets` : ''}
          </h1>
        </div>
      </div>
    </>
  )
};

export default WorkView;