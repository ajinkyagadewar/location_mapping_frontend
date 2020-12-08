import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { routes } from './router'
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Suspense fallback={<h3>Loading...</h3>}>

        <Switch>
          {
            routes.map((route, i) => {
              return (
                <Route
                  exact={route.exact}
                  key={i}
                  path={route.path}
                  component={route.component}
                />
              )
            })
          }
        </Switch>
      </Suspense>

    </div>
  );
}

export default App;
