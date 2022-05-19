const APP_STRINGS = {
  config: {
    cards: [
      {
        name: 'preparation',
        icon: 'clock',
        description: 'Time interval before jumping into action',
      },
      {
        name: 'work',
        icon: 'fire',
        description: 'Time for each excercise block',
      },
      {
        name: 'excercises',
        icon: 'lightning',
        description: 'Number of Excercises in Set',
      },
      {
        name: 'restBetweenExcercises',
        icon: 'hand',
        description: 'Rest time between excercises',
      },
      {
        name: 'sets',
        icon: 'refresh',
        description: 'A set is a group of excercises + Rest times',
      },
      {
        name: 'restBetweenSets',
        icon: 'hand',
        description: 'Rest time between Sets',
      }
    ],
    startButton: 'Start Tabata',
    totalTimeStr: 'Total Time:',
    totalIntervalsStr: 'Intervals',
  }
}

export default APP_STRINGS;