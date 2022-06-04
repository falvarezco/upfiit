
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as _ from 'lodash';
import {totalMinutesStr, numberToSeg, segsToNum} from '../utils/timeTransformers';

// Shared Strings
export const CONFIG_STATUS: string = 'CONFIG';
export const WORK_STATUS: string = 'WORK';
export const FINISHED_STATUS: string = 'FINISHED';
export const PREPARATION: string = 'preparation';
export const WORK: string = 'work';
export const EXCERCISES: string = 'excercises';
export const REST_BT_EXCERCISES: string = 'restBetweenExcercises';
export const SETS: string = 'sets';
export const REST_BT_SETS: string = 'restBetweenSets';


// Action Types
export const FINISHED_TABATA = 'FINISHED_TABATA';

// Todo Create more interfaces for the rest of the actions and move to /types
interface UpdateValues {
  name: string, 
  newValue: number,
}

// Modifiers
const getConfigTotalTime = ({configValues}): number => {
  const {
    preparation,
    work,
    excercises,
    restBetweenExcercises,
    sets,
    restBetweenSets,
  } = configValues;
  // TODO: FIX BUG IN CALC --> Preparation multiplying values wrong
  const total = (preparation + (work * excercises) + (restBetweenExcercises * (excercises - 1)) + restBetweenSets) * sets;
  return total;
}

// Initial State
const initialState = {
  // status: WORK_STATUS,
  status: CONFIG_STATUS,
  totalTime: 0,
  currentSet: 0,
  internalCyIndex: 0,
  currentCycle: {},
  configValues: {
    [PREPARATION]: 0,
    [WORK]: 1,
    [EXCERCISES]:1,
    [REST_BT_EXCERCISES]: 0,
    [SETS]: 1,
    [REST_BT_SETS]: 0,
  },
  workCycles: [],
}

// Reducer Slice
const tabataSlice = createSlice({
  name: 'tabata',
  initialState,
  reducers: {
    updateConfigValues: (state, {payload}: PayloadAction<UpdateValues>) => {
      state.configValues[payload.name] = payload.newValue;
      state.totalTime = getConfigTotalTime(state);
    },
    generateWorkCycles: (state) => {
      // Change View to Work view mode
      state.status = WORK_STATUS;
      // TABATA_ORDER
      const {
        preparation,
        work,
        excercises,
        sets,
        restBetweenExcercises,
        restBetweenSets,
      } = state.configValues;

      state.workCycles.push([{cycle: PREPARATION, time: numberToSeg(preparation)}]);

      for (let setCounter = 0; setCounter < sets; setCounter++) {
        const currentSet = setCounter + 1;
        const hasRestBetweenExcercises = restBetweenExcercises > 0;
        const hasRestBetweenSets = restBetweenSets > 0 && currentSet < sets;
        const workIntervals = [];

        for (let excerciseCounter = 0; excerciseCounter < excercises; excerciseCounter++) {
          if (excerciseCounter === excercises - 1) {
            workIntervals.push(
              {cycle: WORK, time: numberToSeg(work)},
            );
          } else {
            workIntervals.push(
              {cycle: WORK, time: numberToSeg(work)},
            );
            hasRestBetweenExcercises && workIntervals.push(
              {cycle: REST_BT_EXCERCISES, time: numberToSeg(restBetweenExcercises)},
            );
          }
        }
        // add Rest Between Sets time if exist
        if (hasRestBetweenSets) {
          workIntervals.push({cycle: REST_BT_SETS, time: numberToSeg(restBetweenSets)});
        }
        state.workCycles.push(workIntervals);
      }
      // If Preparation Has Zero time then move to initial work cycle
      if (state.workCycles[0][0].time === 0) {
        state.currentSet = 1;
      }
      state.currentCycle = state.workCycles[state.currentSet][state.internalCyIndex];
    },
    setCurrentCycle: (state, {payload}) => {
      state.currentCycle = payload;
    },
    setInternalCyIndex: (state, {payload}) => {
      state.internalCyIndex = payload;
    },
    setCurrentSet: (state, {payload}) => {
      state.currentSet = payload;
    },
    setAppStatus: (state, {payload}) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FINISHED_TABATA, (state, action) => {
      return {...tabataSlice.getInitialState(), status: FINISHED_STATUS};
    });
  },
});

export const {
  updateConfigValues,
  generateWorkCycles,
  setCurrentCycle,
  setInternalCyIndex,
  setCurrentSet,
  setAppStatus,
} = tabataSlice.actions;

export default tabataSlice.reducer;