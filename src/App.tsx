import React from 'react';
import {
  updateConfigValues,
  generateWorkCycles,
  setAppStatus,
  CONFIG_STATUS, 
  WORK_STATUS,
  FINISHED_STATUS,
} from './store/tabata';
import {RootState} from './store';
import {useSelector, useDispatch} from 'react-redux';
import ConfigView from './components/ConfigView';
import FinishedTabata from './components/FinishedTabata';
import WorkView from './components/WorkView';
import Layout from './components/Layout';
import Button from './components/Button';

const App = () => {
  const {
    status,
    workCycles,
    configValues,
    internalCyIndex,
    totalTime,
    currentCycle,
    currentSet,
  } = useSelector(({tabataState}: RootState) => tabataState);

  const dispatch = useDispatch();
  const onHandleConfigUpdate = ({name, newValue}) => dispatch(updateConfigValues({name, newValue}));
  const onTabataWorkInit = () => dispatch(generateWorkCycles());
  const onCreateAnotherTabata = () => dispatch(setAppStatus(CONFIG_STATUS));

  return (
    <Layout>
      {status === CONFIG_STATUS &&
        <ConfigView
          timeSummary={totalTime}
          onCardUpdate={onHandleConfigUpdate}
          onWorkInit={onTabataWorkInit}
          data={configValues}
        />
      }
      {status === WORK_STATUS &&
        <WorkView 
          currentCycle={currentCycle}
          cycles={workCycles}
          config={configValues}
          currentSet={currentSet}
          internalCyIndex={internalCyIndex}
          timeSummary={totalTime}
          totalSets={configValues.sets}
        />
      }
      {status === FINISHED_STATUS &&
        <FinishedTabata>
          <Button onButtonClick={onCreateAnotherTabata}>Create Another Tabata</Button>
        </FinishedTabata>
      }
    </Layout>
  )
}

export default App;