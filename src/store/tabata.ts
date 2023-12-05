
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { InitialState, Cycle } from '../types';
import { numberToSeg } from '../utils/timeTransformers';

// Shared Strings
// TODO: Standarize the way strings are added e.g all lowercase || uppercase || camelCase
export const CONFIG_STATUS      = 'CONFIG';
export const WORK_STATUS        = 'WORK';
export const FINISHED_STATUS    = 'FINISHED';
export const PREPARATION        = 'preparation';
export const WORK               = 'work';
export const EXCERCISES         = 'excercises';
export const REST_BT_EXCERCISES = 'restBetweenExcercises';
export const SETS               = 'sets';
export const REST_BT_SETS       = 'restBetweenSets';
// Action Types
export const FINISHED_TABATA    = 'FINISHED_TABATA';

// Todo Create more interfaces for the rest of the actions and move to /types
interface UpdateValues {
  name: string, 
  newValue: number,
}

// Modifiers
// TODO: Add stronger typing to this method (e.g return number in format 00:00)
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
const initialState: InitialState = {
  status: CONFIG_STATUS,
  sound: null,
  totalTime: 0,
  currentSet: 0,
  internalCyIndex: 0,
  currentCycle: null,
  configValues: {
    // Values are in seconds
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
    updateConfigValues: (state, { payload }: PayloadAction<UpdateValues>) => {
      const { name, newValue } = payload;
      state.configValues[name] = newValue;
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
        const workIntervals: Cycle[] = [];

        for (let excerciseCounter = 0; excerciseCounter < excercises; excerciseCounter++) {
          // Is the last one
          if (excerciseCounter === excercises - 1) {
            workIntervals.push(
              {id: uuid(), cycle: WORK, time: numberToSeg(work)},
            );
          // Is a work excercise at the middle of the list (takes into account rest time in between)
          } else {
            workIntervals.push(
              {id: uuid(), cycle: WORK, time: numberToSeg(work)},
            );
            hasRestBetweenExcercises && workIntervals.push(
              {id: uuid(), cycle: REST_BT_EXCERCISES, time: numberToSeg(restBetweenExcercises)},
            );
          }
        }
        // Add Rest Between Sets time if exist
        if (hasRestBetweenSets) {
          workIntervals.push({cycle: REST_BT_SETS, time: numberToSeg(restBetweenSets)});
        }
        state.workCycles.push(workIntervals as any);
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
    builder.addCase(FINISHED_TABATA, () => {
      return {
        ...tabataSlice.getInitialState(),
        status: FINISHED_STATUS
      };
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