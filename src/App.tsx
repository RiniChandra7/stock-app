import React from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './utils/redux/appStore';

const App: React.FC = () => {
  return (
    <Provider store={appStore}>
      <div className="flex flex-col h-screen">
        <Header />
        <Body />
      </div>
    </Provider>
  );
}

export default App;
