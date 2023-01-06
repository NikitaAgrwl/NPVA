import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={[<Home />]} />
          <Route path='/checkout' element={[<Checkout />]} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;