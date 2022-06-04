import {FC, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {Cycle} from '../types';
import {PREPARATION} from '../store/tabata';
import {totalMinutesStr} from '../utils/timeTransformers';
import CycleTimer from '../classes/CycleTimer';
import {segsToNum} from '../utils/timeTransformers';
import tabataIterator from '../utils/tabataIterator';
import WorkInterval from './WorkInterval';
import Button from './Button';

interface WorkViewProps {
  internalCyIndex: number,
  config?: any,
  cycles: any,
  currentCycle: Cycle | null,
  currentSet: number,
  timeSummary: number,
  totalSets: number,
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
  const cyTimer:any = useRef();
  const totalTimeCount = useRef(timeSummary);
  const {cycle, time} = currentCycle;
  const [cyTimeCount, updateTimeCount] = useState(time);

  const onTimeUpdate = time => {
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
    .then(() =>
      tabataIterator(
        cycles[currentSet].length - 1,
        internalCyIndex,
        updateTimeCount,
        dispatch,
        currentSet,
        cycles,
      )
    );
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