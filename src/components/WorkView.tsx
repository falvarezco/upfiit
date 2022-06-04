import {FC, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {
  setInternalCyIndex,
  setCurrentCycle,
  setCurrentSet,
  PREPARATION,
  FINISHED_TABATA,
} from '../store/tabata';
import {totalMinutesStr} from '../utils/timeTransformers';
import CycleTimer from '../classes/CycleTimer';
import { segsToNum } from '../utils/timeTransformers';
import WorkInterval from './WorkInterval';
import Button from './Button';

interface Cycle {
  cycle: string,
  time: number,
}

interface WorkViewProps {
  internalCyIndex: number,
  config?: any,
  cycles: any,
  currentCycle: Cycle | any,
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
  
  const tabataIterator = (currentSetLength: number, cyIndex: number, resetNextCount: any) => {
    let nextCy: any;
    let nextSet: number;
    let nextInternalIdx: number;
    let isLastCy = false;

    const incrementSet = () => nextSet = currentSet + 1;
    const incrementCycle = () => nextInternalIdx = cyIndex + 1;
    const setNewCycle = (set, cyIdx) => {
      if (cycles[set]) {
        nextCy = cycles[set][cyIdx];
      } else {
        isLastCy = true;
      };
    };

    if (currentSetLength > 0) {
      if (cyIndex < currentSetLength) {
        incrementCycle();
        setNewCycle(currentSet, nextInternalIdx);
      } else {
        nextInternalIdx = 0;
        incrementSet();
        setNewCycle(nextSet, nextInternalIdx)
        dispatch(setCurrentSet(nextSet));
      }
    } else {
      incrementSet();
      nextInternalIdx = 0;
      setNewCycle(nextSet, nextInternalIdx);
      dispatch(setCurrentSet(nextSet));
    }

    if (isLastCy) {
      return dispatch({type: FINISHED_TABATA});
    }
    
    resetNextCount(nextCy.time);
    dispatch(setInternalCyIndex(nextInternalIdx));
    dispatch(setCurrentCycle(nextCy)); 
  }

  useEffect(() => {
    // Initialize Cycle
    cyTimer.current = new CycleTimer(cycle, time, onTimeUpdate);
    // Handle Cycle Ending
    cyTimer
    .current
    .init()
    .then(() =>
      tabataIterator(cycles[currentSet].length - 1, internalCyIndex, updateTimeCount)
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