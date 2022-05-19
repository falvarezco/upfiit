
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {totalMinutesStr} from '../utils/timeTransformers';

export const CONFIG: string = 'CONFIG';
export const WORK: string = 'WORK';

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
  const total = (preparation + (work * excercises) + (restBetweenExcercises * (excercises - 1)) + restBetweenSets) * sets;
  return total ? totalMinutesStr(total) : '--:--';
}

// Initial State
const initialState = { 
  status: CONFIG,
  totalTime: totalMinutesStr(1),
  // TODO: Calculate Intervals
  // totalIntervals: 0,
  configValues: {
    preparation: 0,
    work: 1,
    excercises: 1,
    restBetweenExcercises: 0,
    sets: 1,
    restBetweenSets: 0,
  },
  work: [],
}

// Reducer Slice
const tabataSlice = createSlice({
  name: 'tabata',
  initialState,
  reducers: {
    UpdateConfigValues: (state, {payload}: PayloadAction<UpdateValues>) => {
      state.configValues[payload.name] = payload.newValue;
      state.totalTime = getTotalTime(state);
    }
  }
});

export const {UpdateConfigValues} = tabataSlice.actions;
export default tabataSlice.reducer;