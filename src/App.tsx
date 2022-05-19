import {useState} from 'react';
import {UpdateConfigValues, CONFIG} from './store/tabata';
import {RootState} from './store';
import {useSelector, useDispatch} from 'react-redux';
import ConfigView from './components/ConfigView';
import Layout from './components/Layout';

const App = () => {
  const {status, configValues, totalTime} = useSelector(({tabataState}: RootState) => tabataState);
  const dispatch = useDispatch();
  const onHandleConfigUpdate = ({name, newValue}) => dispatch(UpdateConfigValues({name, newValue}))

  return (
    <Layout>
      {status === CONFIG &&
        <ConfigView
          timeSummary={totalTime}
          onCardUpdate={onHandleConfigUpdate}
          data={configValues}
        />
      }
    </Layout>
  )
}

export default App;