import { Dispatch, SetStateAction } from 'react';
import { AppDispatch } from '../store';
import { Cycle } from '../types';
import {
  setInternalCyIndex,
  setCurrentCycle,
  setCurrentSet,
  FINISHED_TABATA,
} from '../store/tabata';

// TODO: Test this
const tabataIterator = (
  currentSetLength: number,
  cyIndex: number,
  resetNextCount: Dispatch<SetStateAction<number>>,
  dispatch: AppDispatch,
  currentSet: number,
  cycles: Array<[Cycle]>,
) => {
  let nextCycle: Cycle;
  let nextSet: number;
  let nextInternalIdx: number;
  let isLastCy = false;

  const incrementSet = () => nextSet = currentSet + 1;
  const incrementCycle = () => nextInternalIdx = cyIndex + 1;

  const setNewCycle = (set, cyIdx) => {
    if (cycles[set]) {
      nextCycle = cycles[set][cyIdx];
    } else {
      isLastCy = true;
    }
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

  resetNextCount(nextCycle.time);
  dispatch(setInternalCyIndex(nextInternalIdx));
  dispatch(setCurrentCycle(nextCycle));
}

export default tabataIterator;