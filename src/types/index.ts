interface InitialConfig {
  preparation: number,
  work: number,
  excercises: number,
  restBetweenExcercises: number,
  sets: number,
  restBetweenSets: number,
}

interface Cycle {
  cycle: string,
  time: number,
}

interface InitialState {
  status: string,
  totalTime: number,
  currentSet: number,
  internalCyIndex: number,
  currentCycle: Cycle | null,
  configValues: InitialConfig,
  workCycles: Array<[Cycle]>,
}

export {
  InitialConfig,
  InitialState,
  Cycle
}
