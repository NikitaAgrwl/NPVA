import React, { useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { auth } from './firebase';
import { setUser } from './redux/action';
import { connect } from 'react-redux';
import './App.css';

function App({ addUser }) {

  useEffect(() => {
    //only runs once when the app component loads.....

    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        //the user just logged in/ the user was logged in
        addUser(authUser.email);
      } else {
        //the user is logged out
        addUser();
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/login' element={[<Login />]} />
          <Route path='/' element={[<Header />, <Home />]} />
          <Route path='/checkout' element={[<Header />, <Checkout />]} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


const mapStateToProps = (state) => {
  return {
    // basketData: state.basketReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => { dispatch(setUser(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
