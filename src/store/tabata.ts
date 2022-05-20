
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {totalMinutesStr, numberToSeg} from '../utils/timeTransformers';

// Shared Strings
export const CONFIG_STATUS: string = 'CONFIG';
export const WORK_STATUS: string = 'WORK';
export const PREPARATION: string = 'preparation';
export const WORK: string = 'work';
export const EXCERCISES: string = 'excercises';
export const REST_BT_EXCERCISES: string = 'restBetweenExcercises';
export const SETS: string = 'sets';
export const REST_BT_SETS: string = 'restBetweenSets';

interface UpdateValues {
  name: string, 
  newValue: number,
}


// Modifiers
const getTotalTime = ({configValues}): string => {
  const {
    preparation,
    work,
    excercises,
    restBetweenExcercises,
    sets,
    restBetweenSets,
  } = configValues;
  // TODO: FIX BUG IN CALC
  const total = (preparation + (work * excercises) + (restBetweenExcercises * (excercises - 1)) + restBetweenSets) * sets;
  return total ? totalMinutesStr(total) : '--:--';
}

// Initial State
const initialState = { 
  status: CONFIG_STATUS,
  totalTime: totalMinutesStr(1),
  currentSet: 1,
  currentCycle: '',
  numberOfExcercices: 1,
  configValues: {
    [PREPARATION]: 0,
    [WORK]: 1,
    [EXCERCISES]:1,
    [REST_BT_EXCERCISES]: 0,
    [SETS]: 1,
    [REST_BT_SETS]: 0,
  },
  workCycles: {},
}

// Reducer Slice
const tabataSlice = createSlice({
  name: 'tabata',
  initialState,
  reducers: {
    updateConfigValues: (state, {payload}: PayloadAction<UpdateValues>) => {
      state.configValues[payload.name] = payload.newValue;
      state.totalTime = getTotalTime(state);
    },
    initializeWork: (state) => {
      state.status = WORK;
      // TABATA_ORDER
      const {
        preparation,
        work,
        excercises,
        sets,
        restBetweenExcercises,
        restBetweenSets,
      } = state.configValues;

      for (let setCounter = 0; setCounter < sets; setCounter++) {
        const currentSet = `set${setCounter + 1}`;
        const intervals = [];
        for (let excerciseCounter = 0; excerciseCounter < excercises; excerciseCounter++) {
          if (excerciseCounter === excercises - 1) {
            intervals.push({cycle: WORK, time: numberToSeg(work)});
          } else {
            intervals.push(
              {cycle: WORK, time: numberToSeg(work)},
              {cycle: REST_BT_EXCERCISES, time: numberToSeg(restBetweenExcercises)},
            );
          }
        }
        state.workCycles.preparation = {cycle: PREPARATION, time: numberToSeg(preparation)};
        state.workCycles.restBetweenSets = {cycle: REST_BT_SETS, time: numberToSeg(restBetweenSets)};
        state.workCycles[currentSet] = intervals;
      }
    }
  }
});

export const {updateConfigValues, initializeWork} = tabataSlice.actions;
export default tabataSlice.reducer;