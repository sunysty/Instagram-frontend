import React from 'react';
import { Route } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <React.Fragment>
      <Route path='/' exact component={Main} />
    </React.Fragment>
  );
}

export default App;
