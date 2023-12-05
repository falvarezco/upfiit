import React, { useState, useEffect } from 'react';
import {
  updateConfigValues,
  generateWorkCycles,
  setAppStatus,
  CONFIG_STATUS, 
  WORK_STATUS,
  FINISHED_STATUS,
} from './store/tabata';
import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import ConfigView from './components/ConfigView';
import FinishedTabata from './components/FinishedTabata';
import WorkView from './components/WorkView';
import Layout from './components/Layout';
import Button from './components/Button';
import AudioBuffer from './classes/AudioBuffer';

const DING_SOUND_URL = require('./audio/start-ding.mp3');
const FINAL_DING_SOUND_URL = require('./audio/start-final-ding.mp3');

const App = () => {
  const {
    status,
    workCycles,
    configValues,
    internalCyIndex,
    totalTime,
    currentCycle,
    currentSet,
  } = useSelector(({ tabataState }: RootState) => tabataState);
  const [dingSound, setDingSound] = useState<any>(null);
  const [finalDingSound, setFinalDingSound] = useState<any>(null);
  const [audioInitialized, onInitAudio] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dingSound || !finalDingSound) {
      return;
    }
    // Initialize Classes
    dingSound.init();
    finalDingSound.init();
  }, [dingSound, finalDingSound])

  const onHandleConfigUpdate = ({name, newValue}) => {
    dispatch(updateConfigValues({name, newValue}))
  };

  const StartAudioConfig = () => {
    // Load Sounds with given user permission
    setDingSound(new AudioBuffer(DING_SOUND_URL, 0, 1));
    setFinalDingSound(new AudioBuffer(FINAL_DING_SOUND_URL, 0, 1));
    // Set initAudio Flag to true
    onInitAudio(true);
  }

  const onTabataWorkInit = () => {
    dispatch(generateWorkCycles());
  };

  const onCreateAnotherTabata = () => dispatch(setAppStatus(CONFIG_STATUS));

  return (
    <Layout>
      {status === CONFIG_STATUS &&
        <ConfigView
          audioInitialized={audioInitialized}
          timeSummary={totalTime}
          onInitAudio={StartAudioConfig}
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
          dingSound={dingSound}
          finalDingSound={finalDingSound}
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