import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Redux related
import { Provider } from 'react-redux';
import store from './redux/store';

//comopnents
import Register from './components/auth/Register';

class App extends Component {
  render() {
    
    return (
      <Provider store={ store }>
             <div className="App">
                <Router>
                  <Switch>
                    <Route exact path="/" component={Register} /> 
                  </Switch>  
                </Router>
             </div>
      </Provider>
    )
  };
}

export default App;
