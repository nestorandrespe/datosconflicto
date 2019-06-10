import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store";
import "./style/app.scss";

import { BrowserView, MobileView } from "react-device-detect";

import MapContainer from "./components/MapContainer";

class App extends Component {
  render() {
    return (
      <>
        {/* <Provider store={store}>
        <Router> */}
        <BrowserView>
          <div className="App">
            {/* <Route exact path="/" component={MapContainer} /> */}
            <MapContainer />
          </div>
        </BrowserView>
        <MobileView>
          <div className="mobil">
            <p>Esta aplicación solo esta disponible en el escritorio :(</p>
            <p>
              Att: <a href="http://ftb.nestorandres.com/">Follow the Bit</a>
            </p>
          </div>
        </MobileView>
        {/* </Router> */}
        {/* // </Provider> */}
      </>
    );
  }
}

export default App;
