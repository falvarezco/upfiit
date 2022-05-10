import {Component, FC, ReactNode} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Config from './pages/Config'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Config/>}/>
    </Routes>
  );
}

export default App;