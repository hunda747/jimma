import React from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/home'
import DetailPage from './pages/DetailPage/detailPage'
import Checkout from './pages/Checkout/checkout'
import Login from './pages/Login/login'
import Register from './pages/Register/register';
import Dashboard from './pages/Admin/dashboard/dashboard'
import AdminLogin from './pages/Admin/AdminLogin/adminLogin'
import SearchPage from './pages/Search/search';

import Account from './pages/Account/account';

import { Provider } from 'react-redux';
import store from './redux/store';

import UserAuth from './component/Admin/UserAuth'

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<Home />} ></Route>
          <Route exact path='/detail/:id' element={<DetailPage />} ></Route>
          <Route exact path='/search/:name' element={<SearchPage />} ></Route>
          <Route exact path='/login' element={<Login />} ></Route>
          <Route exact path='/Register' element={<Register />} ></Route>

          <Route element={<UserAuth />}>
            <Route exact path='/checkout' element={<Checkout />} ></Route>
          </Route>

          <Route element={<UserAuth />}>
            <Route exact path='/account' element={<Account />} ></Route>
          </Route>

          <Route exact path='/dashboard' element={<Dashboard />} ></Route>
          <Route exact path='/adminLogin' element={<AdminLogin />} ></Route>
          {/* <Route exact path='/login/:id' element={<Login />} ></Route> */}
        </Routes>
      </Provider>
    </>
  );
}

export default App;
