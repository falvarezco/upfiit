import {updateConfigValues, initializeWork, CONFIG_STATUS, WORK_STATUS} from './store/tabata';
import {RootState} from './store';
import {useSelector, useDispatch} from 'react-redux';
import ConfigView from './components/ConfigView';
import WorkView from './components/WorkView';
import Layout from './components/Layout';

const App = () => {
  const {
    status,
    configValues,
    workCycles,
    totalTime,
  } = useSelector(({tabataState}: RootState) => tabataState);
  const dispatch = useDispatch();

  // Component methods
  const onHandleConfigUpdate = ({name, newValue}) => dispatch(updateConfigValues({name, newValue}));
  const onTabataWorkInit = () => dispatch(initializeWork());

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
      {status === WORK_STATUS && <WorkView />}
    </Layout>
  )
}

export default App;