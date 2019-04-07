import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./style/app.scss";

import MapContainer from "./components/MapContainer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={MapContainer} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
