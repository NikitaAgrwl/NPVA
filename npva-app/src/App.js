import React, { useEffect }               from 'react';
import Header                             from './components/Header';
import Home                               from './components/Home';
import Checkout                           from './components/Checkout';
import Orders                             from './components/Orders';
import Login                              from './components/Login';
import Payment                            from './components/Payment';
import { BrowserRouter, Routes, Route }   from 'react-router-dom';
import { auth }                           from './firebase';
import { setUser }                        from './redux/action';
import { connect }                        from 'react-redux';
import { loadStripe }                     from '@stripe/stripe-js';
import { Elements }                       from '@stripe/react-stripe-js';
import './App.css';

const promise = loadStripe('pk_test_51MNgF5SIxOAwwBfzJAMu3KBUstEvl77Bt7pZHX4TefkRSf5ETLzERvhnVFgwf2NoKHUWESlzniKt61olHaEf23DH00lMi40Jah');

function App({ addUser }) {

  useEffect(() => {
    //only runs once when the app component loads.....

    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        //the user just logged in/ the user was logged in
        addUser(authUser.email, authUser.uid);
      } else {
        //the user is logged out
        addUser();
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <div className = "App">
        <Routes>
          <Route path = '/orders' element = {[<Header />, <Orders />]} />
          <Route path = '/login' element = {[<Login />]} />
          <Route
            path      = '/payment'
            element   = {
              [<Header />,
              <Elements stripe = {promise}>
                <Payment />
              </Elements>]
            }
          />
          <Route path = '/' element = {[<Header />, <Home />]} />
          <Route path = '/checkout' element = {[<Header />, <Checkout />]} />
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
