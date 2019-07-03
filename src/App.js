import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Products from './components/Products';

function App() {
  return (
    <React.Fragment>
      <Header />
      
      <main>
        <div className="wrapMainPage">
          <React.Fragment>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/products" component={Products}></Route>
          </React.Fragment>
        </div>
      </main>

      <Footer />
    </React.Fragment>


  );
}

export default App;
