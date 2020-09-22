import React, { Component } from 'react';
import './App.css';

// Redux related
import { Provider } from 'react-redux';
import store from './redux/store';

class App extends Component {
  render() {
    
    return (
      <Provider store={ store }>
             <div className="App">
                ok
             </div>
      </Provider>
    )
  };
}

export default App;
