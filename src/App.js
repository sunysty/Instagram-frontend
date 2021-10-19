import React from 'react';
import { Route } from 'react-router-dom';
import { CommentModal } from './components';

function App() {
  return (
    <React.Fragment>
      <Route path='/commentmodal' exact component={CommentModal} />
    </React.Fragment>
  );
}

export default App;
