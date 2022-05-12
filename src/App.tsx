import {
  Routes,
  Route,
} from "react-router-dom";
import Config from './pages/Config'
import TabataCounter from './pages/TabataCounter'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Config/>}/>
      <Route path="/counter" element={<TabataCounter/>}/>
    </Routes>
  );
}

export default App;